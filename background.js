"use strict";

const DB_NAME = "history-export-db";
const DB_VERSION = 1;
const STORE_RECORDS = "records";
const ARCHIVE_ENABLED_KEY = "archiveEnabled";

chrome.runtime.onInstalled.addListener(async () => {
  const settings = await storageGet({ [ARCHIVE_ENABLED_KEY]: false });
  await storageSet({ [ARCHIVE_ENABLED_KEY]: Boolean(settings[ARCHIVE_ENABLED_KEY]) });
});

chrome.history.onVisited.addListener(async (item) => {
  try {
    const settings = await storageGet({ [ARCHIVE_ENABLED_KEY]: false });
    if (!settings[ARCHIVE_ENABLED_KEY]) {
      return;
    }

    const record = createArchiveRecord(item);
    if (record.url) {
      await putRecord(record);
    }
  } catch (error) {
    console.warn("Aura History Export archive write failed", error);
  }
});

function storageGet(defaults) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(defaults, (result) => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve(result || defaults);
    });
  });
}

function storageSet(values) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(values, () => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve();
    });
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
