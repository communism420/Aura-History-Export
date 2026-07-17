"use strict";

const extensionApi = globalThis.browser ?? globalThis.chrome;
const usesPromiseExtensionApi = typeof globalThis.browser !== "undefined";
const DB_NAME = "history-export-db";
const DB_VERSION = 1;
const STORE_RECORDS = "records";
const ARCHIVE_ENABLED_KEY = "archiveEnabled";
const ARCHIVE_TITLE_REFRESH_DELAY_MS = 1500;
const ARCHIVE_TITLE_REFRESH_WINDOW_MS = 60_000;

extensionApi.runtime.onInstalled.addListener(async () => {
  const settings = await storageGet({ [ARCHIVE_ENABLED_KEY]: false });
  await storageSet({ [ARCHIVE_ENABLED_KEY]: Boolean(settings[ARCHIVE_ENABLED_KEY]) });
});

extensionApi.history.onVisited.addListener(async (item) => {
  try {
    const settings = await storageGet({ [ARCHIVE_ENABLED_KEY]: false });
    if (!settings[ARCHIVE_ENABLED_KEY]) {
      return;
    }

    const refreshedItem = await refreshVisitedItemTitle(item);
    const record = createArchiveRecord(refreshedItem);
    if (record.url) {
      await putRecord(record);
    }
  } catch (error) {
    console.warn("Aura History Export archive write failed", error);
  }
});

extensionApi.history.onVisitRemoved.addListener(async (removed) => {
  try {
    if (removed.allHistory) {
      await clearRecordsBySource("archive");
      return;
    }

    await clearArchiveRecordsByUrls(removed.urls || []);
  } catch (error) {
    console.warn("Aura History Export archive cleanup failed", error);
  }
});

function storageGet(defaults) {
  return callExtensionApi(extensionApi.storage.local, "get", defaults)
    .then((result) => result || defaults);
}

function storageSet(values) {
  return callExtensionApi(extensionApi.storage.local, "set", values);
}

async function refreshVisitedItemTitle(item) {
  if (normalizeText(item.title) || !normalizeText(item.url)) {
    return item;
  }

  await delay(ARCHIVE_TITLE_REFRESH_DELAY_MS);

  try {
    const visitTime = Number(item.lastVisitTime || Date.now());
    const results = await historySearch({
      text: "",
      startTime: Math.max(0, visitTime - ARCHIVE_TITLE_REFRESH_WINDOW_MS),
      endTime: visitTime + ARCHIVE_TITLE_REFRESH_WINDOW_MS,
      maxResults: 500
    });
    const refreshed = results.find((result) => result.url === item.url);
    return refreshed ? { ...item, ...refreshed, lastVisitTime: item.lastVisitTime || refreshed.lastVisitTime } : item;
  } catch {
    return item;
  }
}

function historySearch(query) {
  return callExtensionApi(extensionApi.history, "search", query)
    .then((result) => result || []);
}

function callExtensionApi(apiObject, methodName, ...args) {
  const method = apiObject?.[methodName];
  if (typeof method !== "function") {
    return Promise.reject(new Error(`Unsupported extension API method: ${methodName}`));
  }

  if (usesPromiseExtensionApi) {
    try {
      return Promise.resolve(method.apply(apiObject, args));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return new Promise((resolve, reject) => {
    try {
      method.call(apiObject, ...args, (result) => {
        const error = extensionApi.runtime.lastError;
        if (error) {
          reject(new Error(error.message));
          return;
        }
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function createArchiveRecord(item) {
  const visitTime = Number(item.lastVisitTime || Date.now());
  const url = normalizeText(item.url);
  const domain = extractDomain(url);
  const title = normalizeText(item.title) || url;

  return {
    id: createRecordId("archive", url, visitTime),
    source: "archive",
    visitTime,
    time: formatVisitTime(visitTime),
    title,
    domain,
    url,
    protocol: extractProtocol(url),
    visitCount: numberOrEmpty(item.visitCount),
    typedCount: numberOrEmpty(item.typedCount),
    lastVisitTime: visitTime,
    lastVisitTimeText: formatVisitTime(visitTime),
    transition: "",
    referringVisitId: ""
  };
}

function openHistoryDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_RECORDS)) {
        const store = db.createObjectStore(STORE_RECORDS, { keyPath: "id" });
        store.createIndex("visitTime", "visitTime", { unique: false });
        store.createIndex("source", "source", { unique: false });
        store.createIndex("domain", "domain", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putRecord(record) {
  const db = await openHistoryDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_RECORDS, "readwrite");
    transaction.objectStore(STORE_RECORDS).put(record);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function clearRecordsBySource(source) {
  const db = await openHistoryDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_RECORDS, "readwrite");
    const store = transaction.objectStore(STORE_RECORDS);
    const index = store.index("source");
    const request = index.openCursor(IDBKeyRange.only(source));
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function clearArchiveRecordsByUrls(urls) {
  const urlSet = new Set(urls.map((url) => normalizeText(url)).filter(Boolean));
  if (urlSet.size === 0) {
    return;
  }

  const db = await openHistoryDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_RECORDS, "readwrite");
    const store = transaction.objectStore(STORE_RECORDS);
    const index = store.index("source");
    const request = index.openCursor(IDBKeyRange.only("archive"));
    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        if (urlSet.has(normalizeText(cursor.value.url))) {
          cursor.delete();
        }
        cursor.continue();
      }
    };
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

function createRecordId(source, url, visitTime) {
  return `${source}:${visitTime}:${stableHash(url)}`;
}

function normalizeText(value) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDomain(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname || parsed.protocol.replace(":", "") || "no domain";
  } catch {
    return "no domain";
  }
}

function extractProtocol(url) {
  try {
    return new URL(url).protocol.replace(":", "").toLowerCase() || "other";
  } catch {
    return "other";
  }
}

function numberOrEmpty(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}

function formatVisitTime(timestamp) {
  if (!Number.isFinite(Number(timestamp))) {
    return "";
  }

  const date = new Date(Number(timestamp));
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());
  const seconds = pad2(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function stableHash(value) {
  let hash = 0;
  const text = String(value || "");

  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }

  return (hash >>> 0).toString(36);
}

function pad2(value) {
  return String(value).padStart(2, "0");
}
