"use strict";

const MIME_TYPES = {
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv;charset=utf-8",
  json: "application/json;charset=utf-8",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain;charset=utf-8",
  html: "text/html;charset=utf-8"
};
const DEFAULT_LOCALE = "en";
const SUPPORTED_LOCALES = ["en", "ru", "es", "de", "fr", "pt", "uk"];
const ALL_HISTORY_MAX_RESULTS = 0;
const LOGO_EXPORT_DATA_URI = "data:image/png;base64,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";
const DB_NAME = "history-export-db";
const DB_VERSION = 1;
const STORE_RECORDS = "records";
const SETTINGS_KEY = "historyExportSettings";
const ARCHIVE_ENABLED_KEY = "archiveEnabled";
const PREVIEW_LIMIT = 100;
const CHROME_EPOCH_OFFSET_MS = 11644473600000;

const I18N = {
  en: {
    extensionName: "Aura History Export",
    extensionDescription: "Exports Chromium browser history into clean local files.",
    subtitle: "Professional local history export",
    languageLabel: "Language",
    languageEnglish: "English",
    languageRussian: "Russian",
    languageSpanish: "Spanish",
    languageGerman: "German",
    languageFrench: "French",
    languagePortuguese: "Portuguese",
    languageUkrainian: "Ukrainian",
    beginnerModeTitle: "Beginner mode",
    beginnerModeHint: "Only the essential export settings are shown.",
    tabExport: "Export",
    tabImport: "Import",
    tabArchive: "Archive",
    tabPrivacy: "Privacy",
    rangeLabel: "Range",
    rangeLastDay: "Last 24 hours",
    rangeLastWeek: "Last 7 days",
    rangeLastMonth: "Last 30 days",
    rangeLastQuarter: "Last 90 days",
    rangeAll: "All available history",
    rangeCustom: "Custom dates",
    startDateLabel: "Start date",
    endDateLabel: "End date",
    formatLabel: "Format",
    modeLabel: "Mode",
    modeVisits: "Every visit",
    modeDomains: "Group by domain",
    sourcesTitle: "Sources",
    sourceBrowser: "Browser history",
    sourceArchive: "Local archive",
    sourceTakeout: "Imported Takeout",
    columnsTitle: "Columns",
    columnVisitTime: "Visit time",
    columnPageTitle: "Page title",
    columnDomain: "Domain",
    columnUrl: "URL",
    columnVisitCount: "Visit count",
    columnTypedCount: "Typed count",
    columnLastVisitTime: "Last visit",
    columnTransition: "Transition",
    columnReferrer: "Referrer visit ID",
    columnSource: "Source",
    columnUniquePages: "Unique pages",
    columnFirstVisitTime: "First visit",
    columnTopTitle: "Top title",
    columnTopUrl: "Top URL",
    filtersTitle: "Filters",
    searchLabel: "Search in title, URL, or domain",
    includeDomainsLabel: "Include domains",
    excludeDomainsLabel: "Exclude domains",
    protocolsLabel: "Protocols",
    protocolOther: "Other",
    cleanupLabel: "Cleanup",
    excludeLocalhost: "Exclude localhost",
    requireTitle: "Require page title",
    previewButton: "Preview",
    exportButton: "Export",
    cancelButton: "Cancel",
    statusReady: "Ready to export",
    statusReadingHistory: "Reading history",
    statusReadingArchive: "Reading local data",
    statusFiltering: "Filtering",
    statusGrouping: "Grouping domains",
    statusCreatingFile: "Creating file",
    statusDownloading: "Starting download",
    statusExportComplete: "Export complete",
    statusPreviewComplete: "Preview ready",
    statusProcessingVisits: "Processing visits",
    statusImporting: "Importing",
    statusArchiveBackfill: "Archiving current range",
    statusCancelled: "Cancelled",
    statusNoRecords: "No records found for the selected options",
    previewTitle: "Preview",
    previewEmpty: "Run preview to inspect the export.",
    previewStats: "$COUNT$ rows, $DOMAINS$ domains",
    previewShown: "Showing $SHOWN$ of $TOTAL$",
    takeoutTitle: "Google Takeout import",
    takeoutHint: "Select BrowserHistory.json, CSV, or a Takeout ZIP that contains browser history.",
    importButton: "Import",
    clearTakeoutButton: "Clear imported data",
    importNoFiles: "Select at least one Takeout file.",
    importComplete: "Imported $COUNT$ records.",
    importCleared: "Imported Takeout data cleared.",
    archiveTitle: "Local archive",
    archiveHint: "When enabled, new visits are saved locally in this browser profile so future exports can keep them after Chrome removes older local history.",
    archiveEnableLabel: "Save new visits to local archive",
    backfillArchiveButton: "Archive current range",
    clearArchiveButton: "Clear local archive",
    archiveEnabled: "Local archive enabled.",
    archiveDisabled: "Local archive disabled.",
    archiveStatus: "$ARCHIVE$ archived records, $TAKEOUT$ imported records.",
    archiveBackfillComplete: "Archived $COUNT$ records from the current range.",
    archiveCleared: "Local archive cleared.",
    privacyTitle: "Privacy",
    privacyLocal: "All processing happens locally in your browser.",
    privacyNoServer: "No history is sent to a server.",
    privacyPermissions: "Permissions are limited to browser history and local settings storage.",
    privacyArchive: "The optional archive is stored in this browser profile with IndexedDB.",
    privacyTakeout: "Imported Takeout data stays local until you clear it.",
    exportFailedError: "Failed to export history",
    unknownFormatError: "Unknown export format",
    noColumnsError: "Select at least one column.",
    noSourcesError: "Select at least one source.",
    invalidDateRangeError: "Start date must be before end date.",
    zipUnsupportedError: "This ZIP entry is compressed in a way this browser cannot read.",
    noTakeoutRecordsError: "No browser history records were found in the selected file.",
    noDomain: "no domain",
    sourceBrowserLabel: "Browser",
    sourceArchiveLabel: "Archive",
    sourceTakeoutLabel: "Takeout",
    sheetVisits: "Visits",
    sheetDomains: "Domains",
    jsonGeneratedBy: "Aura History Export",
    htmlTitle: "Aura History Export",
    downloadFallbackWarning: "Download uses a local browser Blob link."
  },
  ru: {
    extensionName: "Aura History Export",
    extensionDescription: "Экспортирует историю Chromium-браузера в чистые локальные файлы.",
    subtitle: "Профессиональный локальный экспорт истории",
    languageLabel: "Язык",
    languageEnglish: "Английский",
    languageRussian: "Русский",
    languageSpanish: "Испанский",
    languageGerman: "Немецкий",
    languageFrench: "Французский",
    languagePortuguese: "Португальский",
    languageUkrainian: "Украинский",
    beginnerModeTitle: "Режим новичка",
    beginnerModeHint: "Показаны только основные настройки экспорта.",
    tabExport: "Экспорт",
    tabImport: "Импорт",
    tabArchive: "Архив",
    tabPrivacy: "Приватность",
    rangeLabel: "Период",
    rangeLastDay: "Последние 24 часа",
    rangeLastWeek: "Последние 7 дней",
    rangeLastMonth: "Последние 30 дней",
    rangeLastQuarter: "Последние 90 дней",
    rangeAll: "Вся доступная история",
    rangeCustom: "Свои даты",
    startDateLabel: "Дата начала",
    endDateLabel: "Дата конца",
    formatLabel: "Формат",
    modeLabel: "Режим",
    modeVisits: "Каждое посещение",
    modeDomains: "Группировать по доменам",
    sourcesTitle: "Источники",
    sourceBrowser: "История браузера",
    sourceArchive: "Локальный архив",
    sourceTakeout: "Импорт Takeout",
    columnsTitle: "Столбцы",
    columnVisitTime: "Время посещения",
    columnPageTitle: "Название страницы",
    columnDomain: "Домен",
    columnUrl: "URL",
    columnVisitCount: "Количество посещений",
    columnTypedCount: "Введено вручную",
    columnLastVisitTime: "Последний визит",
    columnTransition: "Тип перехода",
    columnReferrer: "ID визита-источника",
    columnSource: "Источник",
    columnUniquePages: "Уникальные страницы",
    columnFirstVisitTime: "Первый визит",
    columnTopTitle: "Главное название",
    columnTopUrl: "Главный URL",
    filtersTitle: "Фильтры",
    searchLabel: "Поиск в названии, URL или домене",
    includeDomainsLabel: "Включить домены",
    excludeDomainsLabel: "Исключить домены",
    protocolsLabel: "Протоколы",
    protocolOther: "Другие",
    cleanupLabel: "Очистка",
    excludeLocalhost: "Исключить localhost",
    requireTitle: "Требовать название страницы",
    previewButton: "Предпросмотр",
    exportButton: "Экспортировать",
    cancelButton: "Отменить",
    statusReady: "Готово к экспорту",
    statusReadingHistory: "Чтение истории",
    statusReadingArchive: "Чтение локальных данных",
    statusFiltering: "Фильтрация",
    statusGrouping: "Группировка доменов",
    statusCreatingFile: "Создание файла",
    statusDownloading: "Запуск скачивания",
    statusExportComplete: "Экспорт завершен",
    statusPreviewComplete: "Предпросмотр готов",
    statusProcessingVisits: "Обработка посещений",
    statusImporting: "Импорт",
    statusArchiveBackfill: "Архивация текущего периода",
    statusCancelled: "Отменено",
    statusNoRecords: "По выбранным настройкам записей не найдено",
    previewTitle: "Предпросмотр",
    previewEmpty: "Запустите предпросмотр, чтобы проверить экспорт.",
    previewStats: "$COUNT$ строк, $DOMAINS$ доменов",
    previewShown: "Показано $SHOWN$ из $TOTAL$",
    takeoutTitle: "Импорт Google Takeout",
    takeoutHint: "Выберите BrowserHistory.json, CSV или ZIP Takeout с историей браузера.",
    importButton: "Импортировать",
    clearTakeoutButton: "Очистить импорт",
    importNoFiles: "Выберите хотя бы один файл Takeout.",
    importComplete: "Импортировано записей: $COUNT$.",
    importCleared: "Импортированные данные Takeout очищены.",
    archiveTitle: "Локальный архив",
    archiveHint: "Если включить архив, новые посещения будут сохраняться локально в этом профиле браузера, чтобы будущие экспорты могли сохранять их после удаления старой локальной истории Chrome.",
    archiveEnableLabel: "Сохранять новые посещения в локальный архив",
    backfillArchiveButton: "Архивировать текущий период",
    clearArchiveButton: "Очистить локальный архив",
    archiveEnabled: "Локальный архив включен.",
    archiveDisabled: "Локальный архив выключен.",
    archiveStatus: "$ARCHIVE$ записей в архиве, $TAKEOUT$ импортировано.",
    archiveBackfillComplete: "Архивировано записей из текущего периода: $COUNT$.",
    archiveCleared: "Локальный архив очищен.",
    privacyTitle: "Приватность",
    privacyLocal: "Вся обработка выполняется локально в браузере.",
    privacyNoServer: "История не отправляется на сервер.",
    privacyPermissions: "Разрешения ограничены историей браузера и локальным хранилищем настроек.",
    privacyArchive: "Опциональный архив хранится в этом профиле браузера через IndexedDB.",
    privacyTakeout: "Импортированные данные Takeout остаются локальными, пока вы их не очистите.",
    exportFailedError: "Не удалось экспортировать историю",
    unknownFormatError: "Неизвестный формат экспорта",
    noColumnsError: "Выберите хотя бы один столбец.",
    noSourcesError: "Выберите хотя бы один источник.",
    invalidDateRangeError: "Дата начала должна быть раньше даты конца.",
    zipUnsupportedError: "Эта запись ZIP сжата способом, который браузер не может прочитать.",
    noTakeoutRecordsError: "В выбранном файле не найдены записи истории браузера.",
    noDomain: "нет домена",
    sourceBrowserLabel: "Браузер",
    sourceArchiveLabel: "Архив",
    sourceTakeoutLabel: "Takeout",
    sheetVisits: "Посещения",
    sheetDomains: "Домены",
    jsonGeneratedBy: "Aura History Export",
    htmlTitle: "Aura History Export",
    downloadFallbackWarning: "Скачивание выполняется через локальную Blob-ссылку."
  },
  es: {
    extensionName: "Aura History Export",
    extensionDescription: "Exporta el historial de Chromium a archivos locales limpios.",
    subtitle: "Exportacion local profesional del historial",
    languageLabel: "Idioma",
    languageEnglish: "Ingles",
    languageRussian: "Ruso",
    languageSpanish: "Espanol",
    languageGerman: "Aleman",
    languageFrench: "Frances",
    languagePortuguese: "Portugues",
    languageUkrainian: "Ucraniano",
    beginnerModeTitle: "Modo principiante",
    beginnerModeHint: "Solo se muestran los ajustes esenciales de exportacion.",
    tabExport: "Exportar",
    tabImport: "Importar",
    tabArchive: "Archivo",
    tabPrivacy: "Privacidad",
    rangeLabel: "Periodo",
    rangeLastDay: "Ultimas 24 horas",
    rangeLastWeek: "Ultimos 7 dias",
    rangeLastMonth: "Ultimos 30 dias",
    rangeLastQuarter: "Ultimos 90 dias",
    rangeAll: "Todo el historial disponible",
    rangeCustom: "Fechas personalizadas",
    startDateLabel: "Fecha inicial",
    endDateLabel: "Fecha final",
    formatLabel: "Formato",
    modeLabel: "Modo",
    modeVisits: "Cada visita",
    modeDomains: "Agrupar por dominio",
    sourcesTitle: "Fuentes",
    sourceBrowser: "Historial del navegador",
    sourceArchive: "Archivo local",
    sourceTakeout: "Takeout importado",
    columnsTitle: "Columnas",
    columnVisitTime: "Hora de visita",
    columnPageTitle: "Titulo de pagina",
    columnDomain: "Dominio",
    columnUrl: "URL",
    columnVisitCount: "Numero de visitas",
    columnTypedCount: "Escritas manualmente",
    columnLastVisitTime: "Ultima visita",
    columnTransition: "Transicion",
    columnReferrer: "ID de visita referente",
    columnSource: "Fuente",
    columnUniquePages: "Paginas unicas",
    columnFirstVisitTime: "Primera visita",
    columnTopTitle: "Titulo principal",
    columnTopUrl: "URL principal",
    filtersTitle: "Filtros",
    searchLabel: "Buscar en titulo, URL o dominio",
    includeDomainsLabel: "Incluir dominios",
    excludeDomainsLabel: "Excluir dominios",
    protocolsLabel: "Protocolos",
    protocolOther: "Otros",
    cleanupLabel: "Limpieza",
    excludeLocalhost: "Excluir localhost",
    requireTitle: "Requerir titulo de pagina",
    previewButton: "Vista previa",
    exportButton: "Exportar",
    cancelButton: "Cancelar",
    statusReady: "Listo para exportar",
    statusReadingHistory: "Leyendo historial",
    statusReadingArchive: "Leyendo datos locales",
    statusFiltering: "Filtrando",
    statusGrouping: "Agrupando dominios",
    statusCreatingFile: "Creando archivo",
    statusDownloading: "Iniciando descarga",
    statusExportComplete: "Exportacion completa",
    statusPreviewComplete: "Vista previa lista",
    statusProcessingVisits: "Procesando visitas",
    statusImporting: "Importando",
    statusArchiveBackfill: "Archivando periodo actual",
    statusCancelled: "Cancelado",
    statusNoRecords: "No se encontraron registros",
    previewTitle: "Vista previa",
    previewEmpty: "Ejecuta la vista previa para revisar la exportacion.",
    previewStats: "$COUNT$ filas, $DOMAINS$ dominios",
    previewShown: "Mostrando $SHOWN$ de $TOTAL$",
    takeoutTitle: "Importacion de Google Takeout",
    takeoutHint: "Selecciona BrowserHistory.json, CSV o un ZIP de Takeout con historial.",
    importButton: "Importar",
    clearTakeoutButton: "Borrar datos importados",
    importNoFiles: "Selecciona al menos un archivo Takeout.",
    importComplete: "$COUNT$ registros importados.",
    importCleared: "Datos importados borrados.",
    archiveTitle: "Archivo local",
    archiveHint: "Si esta activado, las nuevas visitas se guardan localmente en este perfil.",
    archiveEnableLabel: "Guardar nuevas visitas en el archivo local",
    backfillArchiveButton: "Archivar periodo actual",
    clearArchiveButton: "Borrar archivo local",
    archiveEnabled: "Archivo local activado.",
    archiveDisabled: "Archivo local desactivado.",
    archiveStatus: "$ARCHIVE$ registros archivados, $TAKEOUT$ importados.",
    archiveBackfillComplete: "$COUNT$ registros archivados del periodo actual.",
    archiveCleared: "Archivo local borrado.",
    privacyTitle: "Privacidad",
    privacyLocal: "Todo se procesa localmente en tu navegador.",
    privacyNoServer: "El historial no se envia a ningun servidor.",
    privacyPermissions: "Los permisos se limitan a historial, descargas y almacenamiento local.",
    privacyArchive: "El archivo opcional se guarda con IndexedDB en este perfil.",
    privacyTakeout: "Los datos de Takeout quedan locales hasta que los borres.",
    exportFailedError: "No se pudo exportar el historial",
    unknownFormatError: "Formato de exportacion desconocido",
    noColumnsError: "Selecciona al menos una columna.",
    noSourcesError: "Selecciona al menos una fuente.",
    invalidDateRangeError: "La fecha inicial debe ser anterior a la final.",
    zipUnsupportedError: "Esta entrada ZIP usa compresion no compatible.",
    noTakeoutRecordsError: "No se encontraron registros de historial en el archivo.",
    noDomain: "sin dominio",
    sourceBrowserLabel: "Navegador",
    sourceArchiveLabel: "Archivo",
    sourceTakeoutLabel: "Takeout",
    sheetVisits: "Visitas",
    sheetDomains: "Dominios",
    jsonGeneratedBy: "Aura History Export",
    htmlTitle: "Aura History Export",
    downloadFallbackWarning: "La descarga usa un enlace Blob local del navegador."
  },
  de: {
    extensionName: "Aura History Export",
    extensionDescription: "Exportiert den Chromium-Verlauf in saubere lokale Dateien.",
    subtitle: "Professioneller lokaler Verlaufsexport",
    languageLabel: "Sprache",
    languageEnglish: "Englisch",
    languageRussian: "Russisch",
    languageSpanish: "Spanisch",
    languageGerman: "Deutsch",
    languageFrench: "Franzosisch",
    languagePortuguese: "Portugiesisch",
    languageUkrainian: "Ukrainisch",
    beginnerModeTitle: "Einsteigermodus",
    beginnerModeHint: "Nur die wichtigsten Exporteinstellungen werden angezeigt.",
    tabExport: "Export",
    tabImport: "Import",
    tabArchive: "Archiv",
    tabPrivacy: "Datenschutz",
    rangeLabel: "Zeitraum",
    rangeLastDay: "Letzte 24 Stunden",
    rangeLastWeek: "Letzte 7 Tage",
    rangeLastMonth: "Letzte 30 Tage",
    rangeLastQuarter: "Letzte 90 Tage",
    rangeAll: "Gesamter verfugbarer Verlauf",
    rangeCustom: "Benutzerdefinierte Daten",
    startDateLabel: "Startdatum",
    endDateLabel: "Enddatum",
    formatLabel: "Format",
    modeLabel: "Modus",
    modeVisits: "Jeder Besuch",
    modeDomains: "Nach Domain gruppieren",
    sourcesTitle: "Quellen",
    sourceBrowser: "Browser-Verlauf",
    sourceArchive: "Lokales Archiv",
    sourceTakeout: "Importiertes Takeout",
    columnsTitle: "Spalten",
    columnVisitTime: "Besuchszeit",
    columnPageTitle: "Seitentitel",
    columnDomain: "Domain",
    columnUrl: "URL",
    columnVisitCount: "Besuche",
    columnTypedCount: "Manuell eingegeben",
    columnLastVisitTime: "Letzter Besuch",
    columnTransition: "Ubergang",
    columnReferrer: "Referrer-Besuchs-ID",
    columnSource: "Quelle",
    columnUniquePages: "Eindeutige Seiten",
    columnFirstVisitTime: "Erster Besuch",
    columnTopTitle: "Haupttitel",
    columnTopUrl: "Haupt-URL",
    filtersTitle: "Filter",
    searchLabel: "In Titel, URL oder Domain suchen",
    includeDomainsLabel: "Domains einschliessen",
    excludeDomainsLabel: "Domains ausschliessen",
    protocolsLabel: "Protokolle",
    protocolOther: "Andere",
    cleanupLabel: "Bereinigung",
    excludeLocalhost: "localhost ausschliessen",
    requireTitle: "Seitentitel verlangen",
    previewButton: "Vorschau",
    exportButton: "Exportieren",
    cancelButton: "Abbrechen",
    statusReady: "Bereit zum Export",
    statusReadingHistory: "Verlauf wird gelesen",
    statusReadingArchive: "Lokale Daten werden gelesen",
    statusFiltering: "Filterung",
    statusGrouping: "Domains werden gruppiert",
    statusCreatingFile: "Datei wird erstellt",
    statusDownloading: "Download wird gestartet",
    statusExportComplete: "Export abgeschlossen",
    statusPreviewComplete: "Vorschau bereit",
    statusProcessingVisits: "Besuche werden verarbeitet",
    statusImporting: "Import",
    statusArchiveBackfill: "Aktueller Zeitraum wird archiviert",
    statusCancelled: "Abgebrochen",
    statusNoRecords: "Keine Eintrage gefunden",
    previewTitle: "Vorschau",
    previewEmpty: "Starte die Vorschau, um den Export zu prufen.",
    previewStats: "$COUNT$ Zeilen, $DOMAINS$ Domains",
    previewShown: "$SHOWN$ von $TOTAL$ angezeigt",
    takeoutTitle: "Google Takeout Import",
    takeoutHint: "Wahle BrowserHistory.json, CSV oder ein Takeout-ZIP mit Verlauf.",
    importButton: "Importieren",
    clearTakeoutButton: "Importierte Daten loschen",
    importNoFiles: "Wahle mindestens eine Takeout-Datei.",
    importComplete: "$COUNT$ Eintrage importiert.",
    importCleared: "Importierte Daten geloscht.",
    archiveTitle: "Lokales Archiv",
    archiveHint: "Wenn aktiviert, werden neue Besuche lokal in diesem Browserprofil gespeichert.",
    archiveEnableLabel: "Neue Besuche im lokalen Archiv speichern",
    backfillArchiveButton: "Aktuellen Zeitraum archivieren",
    clearArchiveButton: "Lokales Archiv loschen",
    archiveEnabled: "Lokales Archiv aktiviert.",
    archiveDisabled: "Lokales Archiv deaktiviert.",
    archiveStatus: "$ARCHIVE$ archivierte Eintrage, $TAKEOUT$ importiert.",
    archiveBackfillComplete: "$COUNT$ Eintrage aus dem aktuellen Zeitraum archiviert.",
    archiveCleared: "Lokales Archiv geloscht.",
    privacyTitle: "Datenschutz",
    privacyLocal: "Alles wird lokal im Browser verarbeitet.",
    privacyNoServer: "Der Verlauf wird an keinen Server gesendet.",
    privacyPermissions: "Berechtigungen sind auf Browserverlauf und lokale Einstellungen begrenzt.",
    privacyArchive: "Das optionale Archiv wird per IndexedDB in diesem Profil gespeichert.",
    privacyTakeout: "Importierte Takeout-Daten bleiben lokal, bis du sie loschst.",
    exportFailedError: "Verlauf konnte nicht exportiert werden",
    unknownFormatError: "Unbekanntes Exportformat",
    noColumnsError: "Wahle mindestens eine Spalte.",
    noSourcesError: "Wahle mindestens eine Quelle.",
    invalidDateRangeError: "Das Startdatum muss vor dem Enddatum liegen.",
    zipUnsupportedError: "Dieser ZIP-Eintrag nutzt nicht unterstutzte Komprimierung.",
    noTakeoutRecordsError: "Keine Verlaufseintrage in der Datei gefunden.",
    noDomain: "keine Domain",
    sourceBrowserLabel: "Browser",
    sourceArchiveLabel: "Archiv",
    sourceTakeoutLabel: "Takeout",
    sheetVisits: "Besuche",
    sheetDomains: "Domains",
    jsonGeneratedBy: "Aura History Export",
    htmlTitle: "Aura History Export",
    downloadFallbackWarning: "Der Download nutzt einen lokalen Blob-Link des Browsers."
  },
  fr: {},
  pt: {},
  uk: {}
};

I18N.fr = {
  ...I18N.en,
  extensionDescription: "Exporte l'historique Chromium vers des fichiers locaux propres.",
  subtitle: "Export local professionnel de l'historique",
  languageLabel: "Langue",
  languageEnglish: "Anglais",
  languageRussian: "Russe",
  languageSpanish: "Espagnol",
  languageGerman: "Allemand",
  languageFrench: "Francais",
  languagePortuguese: "Portugais",
  languageUkrainian: "Ukrainien",
  beginnerModeTitle: "Mode debutant",
  beginnerModeHint: "Seuls les reglages essentiels d'export sont affiches.",
  tabExport: "Exporter",
  tabImport: "Importer",
  tabArchive: "Archive",
  tabPrivacy: "Confidentialite",
  rangeLabel: "Periode",
  rangeLastDay: "Dernieres 24 heures",
  rangeLastWeek: "7 derniers jours",
  rangeLastMonth: "30 derniers jours",
  rangeLastQuarter: "90 derniers jours",
  rangeAll: "Tout l'historique disponible",
  rangeCustom: "Dates personnalisees",
  startDateLabel: "Date de debut",
  endDateLabel: "Date de fin",
  formatLabel: "Format",
  modeLabel: "Mode",
  modeVisits: "Chaque visite",
  modeDomains: "Grouper par domaine",
  sourcesTitle: "Sources",
  sourceBrowser: "Historique du navigateur",
  sourceArchive: "Archive locale",
  sourceTakeout: "Takeout importe",
  columnsTitle: "Colonnes",
  columnVisitTime: "Heure de visite",
  columnPageTitle: "Titre de page",
  columnDomain: "Domaine",
  columnVisitCount: "Nombre de visites",
  columnTypedCount: "Saisies manuelles",
  columnLastVisitTime: "Derniere visite",
  columnTransition: "Transition",
  columnReferrer: "ID de visite referente",
  columnSource: "Source",
  columnUniquePages: "Pages uniques",
  columnFirstVisitTime: "Premiere visite",
  columnTopTitle: "Titre principal",
  columnTopUrl: "URL principale",
  filtersTitle: "Filtres",
  searchLabel: "Rechercher dans le titre, l'URL ou le domaine",
  includeDomainsLabel: "Inclure les domaines",
  excludeDomainsLabel: "Exclure les domaines",
  protocolsLabel: "Protocoles",
  protocolOther: "Autres",
  cleanupLabel: "Nettoyage",
  excludeLocalhost: "Exclure localhost",
  requireTitle: "Exiger un titre de page",
  previewButton: "Apercu",
  exportButton: "Exporter",
  cancelButton: "Annuler",
  statusReady: "Pret a exporter",
  statusReadingHistory: "Lecture de l'historique",
  statusReadingArchive: "Lecture des donnees locales",
  statusFiltering: "Filtrage",
  statusGrouping: "Groupement des domaines",
  statusCreatingFile: "Creation du fichier",
  statusDownloading: "Demarrage du telechargement",
  statusExportComplete: "Export termine",
  statusPreviewComplete: "Apercu pret",
  statusProcessingVisits: "Traitement des visites",
  statusImporting: "Import",
  statusArchiveBackfill: "Archivage de la periode actuelle",
  statusCancelled: "Annule",
  statusNoRecords: "Aucun enregistrement trouve",
  previewTitle: "Apercu",
  previewEmpty: "Lancez l'apercu pour verifier l'export.",
  previewStats: "$COUNT$ lignes, $DOMAINS$ domaines",
  previewShown: "$SHOWN$ sur $TOTAL$ affiches",
  takeoutTitle: "Import Google Takeout",
  takeoutHint: "Selectionnez BrowserHistory.json, CSV ou un ZIP Takeout avec l'historique.",
  importButton: "Importer",
  clearTakeoutButton: "Effacer les donnees importees",
  importNoFiles: "Selectionnez au moins un fichier Takeout.",
  importComplete: "$COUNT$ enregistrements importes.",
  importCleared: "Donnees importees effacees.",
  archiveTitle: "Archive locale",
  archiveHint: "Si activee, les nouvelles visites sont enregistrees localement dans ce profil.",
  archiveEnableLabel: "Enregistrer les nouvelles visites dans l'archive locale",
  backfillArchiveButton: "Archiver la periode actuelle",
  clearArchiveButton: "Effacer l'archive locale",
  archiveEnabled: "Archive locale activee.",
  archiveDisabled: "Archive locale desactivee.",
  archiveStatus: "$ARCHIVE$ enregistrements archives, $TAKEOUT$ importes.",
  archiveBackfillComplete: "$COUNT$ enregistrements archives depuis la periode actuelle.",
  archiveCleared: "Archive locale effacee.",
  privacyTitle: "Confidentialite",
  privacyLocal: "Tout le traitement se fait localement dans votre navigateur.",
  privacyNoServer: "L'historique n'est envoye a aucun serveur.",
  privacyPermissions: "Les permissions sont limitees a l'historique, aux telechargements et aux parametres locaux.",
  privacyArchive: "L'archive optionnelle est stockee avec IndexedDB dans ce profil.",
  privacyTakeout: "Les donnees Takeout importees restent locales jusqu'a suppression.",
  exportFailedError: "Impossible d'exporter l'historique",
  unknownFormatError: "Format d'export inconnu",
  noColumnsError: "Selectionnez au moins une colonne.",
  noSourcesError: "Selectionnez au moins une source.",
  invalidDateRangeError: "La date de debut doit preceder la date de fin.",
  zipUnsupportedError: "Cette entree ZIP utilise une compression non prise en charge.",
  noTakeoutRecordsError: "Aucun enregistrement d'historique trouve dans le fichier.",
  noDomain: "aucun domaine",
  sourceBrowserLabel: "Navigateur",
  sourceArchiveLabel: "Archive",
  sourceTakeoutLabel: "Takeout",
  sheetVisits: "Visites",
  sheetDomains: "Domaines",
  downloadFallbackWarning: "Le telechargement utilise un lien Blob local du navigateur."
};

I18N.pt = {
  ...I18N.en,
  extensionDescription: "Exporta o historico do Chromium para arquivos locais limpos.",
  subtitle: "Exportacao local profissional do historico",
  languageLabel: "Idioma",
  languageEnglish: "Ingles",
  languageRussian: "Russo",
  languageSpanish: "Espanhol",
  languageGerman: "Alemao",
  languageFrench: "Frances",
  languagePortuguese: "Portugues",
  languageUkrainian: "Ucraniano",
  beginnerModeTitle: "Modo iniciante",
  beginnerModeHint: "Apenas as configuracoes essenciais de exportacao sao exibidas.",
  tabExport: "Exportar",
  tabImport: "Importar",
  tabArchive: "Arquivo",
  tabPrivacy: "Privacidade",
  rangeLabel: "Periodo",
  rangeLastDay: "Ultimas 24 horas",
  rangeLastWeek: "Ultimos 7 dias",
  rangeLastMonth: "Ultimos 30 dias",
  rangeLastQuarter: "Ultimos 90 dias",
  rangeAll: "Todo o historico disponivel",
  rangeCustom: "Datas personalizadas",
  startDateLabel: "Data inicial",
  endDateLabel: "Data final",
  formatLabel: "Formato",
  modeLabel: "Modo",
  modeVisits: "Cada visita",
  modeDomains: "Agrupar por dominio",
  sourcesTitle: "Fontes",
  sourceBrowser: "Historico do navegador",
  sourceArchive: "Arquivo local",
  sourceTakeout: "Takeout importado",
  columnsTitle: "Colunas",
  columnVisitTime: "Hora da visita",
  columnPageTitle: "Titulo da pagina",
  columnDomain: "Dominio",
  columnVisitCount: "Numero de visitas",
  columnTypedCount: "Digitadas manualmente",
  columnLastVisitTime: "Ultima visita",
  columnTransition: "Transicao",
  columnReferrer: "ID da visita referente",
  columnSource: "Fonte",
  columnUniquePages: "Paginas unicas",
  columnFirstVisitTime: "Primeira visita",
  columnTopTitle: "Titulo principal",
  columnTopUrl: "URL principal",
  filtersTitle: "Filtros",
  searchLabel: "Pesquisar em titulo, URL ou dominio",
  includeDomainsLabel: "Incluir dominios",
  excludeDomainsLabel: "Excluir dominios",
  protocolsLabel: "Protocolos",
  protocolOther: "Outros",
  cleanupLabel: "Limpeza",
  excludeLocalhost: "Excluir localhost",
  requireTitle: "Exigir titulo da pagina",
  previewButton: "Previa",
  exportButton: "Exportar",
  cancelButton: "Cancelar",
  statusReady: "Pronto para exportar",
  statusReadingHistory: "Lendo historico",
  statusReadingArchive: "Lendo dados locais",
  statusFiltering: "Filtrando",
  statusGrouping: "Agrupando dominios",
  statusCreatingFile: "Criando arquivo",
  statusDownloading: "Iniciando download",
  statusExportComplete: "Exportacao concluida",
  statusPreviewComplete: "Previa pronta",
  statusProcessingVisits: "Processando visitas",
  statusImporting: "Importando",
  statusArchiveBackfill: "Arquivando periodo atual",
  statusCancelled: "Cancelado",
  statusNoRecords: "Nenhum registro encontrado",
  previewTitle: "Previa",
  previewEmpty: "Execute a previa para verificar a exportacao.",
  previewStats: "$COUNT$ linhas, $DOMAINS$ dominios",
  previewShown: "Mostrando $SHOWN$ de $TOTAL$",
  takeoutTitle: "Importacao do Google Takeout",
  takeoutHint: "Selecione BrowserHistory.json, CSV ou um ZIP Takeout com historico.",
  importButton: "Importar",
  clearTakeoutButton: "Limpar dados importados",
  importNoFiles: "Selecione pelo menos um arquivo Takeout.",
  importComplete: "$COUNT$ registros importados.",
  importCleared: "Dados importados limpos.",
  archiveTitle: "Arquivo local",
  archiveHint: "Quando ativado, novas visitas sao salvas localmente neste perfil.",
  archiveEnableLabel: "Salvar novas visitas no arquivo local",
  backfillArchiveButton: "Arquivar periodo atual",
  clearArchiveButton: "Limpar arquivo local",
  archiveEnabled: "Arquivo local ativado.",
  archiveDisabled: "Arquivo local desativado.",
  archiveStatus: "$ARCHIVE$ registros arquivados, $TAKEOUT$ importados.",
  archiveBackfillComplete: "$COUNT$ registros arquivados do periodo atual.",
  archiveCleared: "Arquivo local limpo.",
  privacyTitle: "Privacidade",
  privacyLocal: "Todo o processamento acontece localmente no navegador.",
  privacyNoServer: "O historico nao e enviado a nenhum servidor.",
  privacyPermissions: "As permissoes se limitam ao historico do navegador e ao armazenamento local.",
  privacyArchive: "O arquivo opcional e armazenado com IndexedDB neste perfil.",
  privacyTakeout: "Dados do Takeout importados ficam locais ate serem limpos.",
  exportFailedError: "Falha ao exportar historico",
  unknownFormatError: "Formato de exportacao desconhecido",
  noColumnsError: "Selecione pelo menos uma coluna.",
  noSourcesError: "Selecione pelo menos uma fonte.",
  invalidDateRangeError: "A data inicial deve ser anterior a final.",
  zipUnsupportedError: "Esta entrada ZIP usa compressao nao suportada.",
  noTakeoutRecordsError: "Nenhum registro de historico foi encontrado no arquivo.",
  noDomain: "sem dominio",
  sourceBrowserLabel: "Navegador",
  sourceArchiveLabel: "Arquivo",
  sourceTakeoutLabel: "Takeout",
  sheetVisits: "Visitas",
  sheetDomains: "Dominios",
  downloadFallbackWarning: "O download usa um link Blob local do navegador."
};

I18N.uk = {
  ...I18N.ru,
  extensionDescription: "Експортує історію Chromium-браузера у чисті локальні файли.",
  subtitle: "Професійний локальний експорт історії",
  languageLabel: "Мова",
  languageEnglish: "Англійська",
  languageRussian: "Російська",
  languageSpanish: "Іспанська",
  languageGerman: "Німецька",
  languageFrench: "Французька",
  languagePortuguese: "Португальська",
  languageUkrainian: "Українська",
  beginnerModeTitle: "Режим новачка",
  beginnerModeHint: "Показано лише основні налаштування експорту.",
  tabExport: "Експорт",
  tabImport: "Імпорт",
  tabArchive: "Архів",
  tabPrivacy: "Приватність",
  rangeLabel: "Період",
  rangeLastDay: "Останні 24 години",
  rangeLastWeek: "Останні 7 днів",
  rangeLastMonth: "Останні 30 днів",
  rangeLastQuarter: "Останні 90 днів",
  rangeAll: "Уся доступна історія",
  rangeCustom: "Власні дати",
  startDateLabel: "Дата початку",
  endDateLabel: "Дата кінця",
  formatLabel: "Формат",
  modeLabel: "Режим",
  modeVisits: "Кожне відвідування",
  modeDomains: "Групувати за доменами",
  sourcesTitle: "Джерела",
  sourceBrowser: "Історія браузера",
  sourceArchive: "Локальний архів",
  sourceTakeout: "Імпорт Takeout",
  columnsTitle: "Стовпці",
  columnVisitTime: "Час відвідування",
  columnPageTitle: "Назва сторінки",
  columnDomain: "Домен",
  columnVisitCount: "Кількість відвідувань",
  columnTypedCount: "Введено вручну",
  columnLastVisitTime: "Останній візит",
  columnTransition: "Тип переходу",
  columnReferrer: "ID візиту-джерела",
  columnSource: "Джерело",
  columnUniquePages: "Унікальні сторінки",
  columnFirstVisitTime: "Перший візит",
  columnTopTitle: "Головна назва",
  columnTopUrl: "Головний URL",
  filtersTitle: "Фільтри",
  searchLabel: "Пошук у назві, URL або домені",
  includeDomainsLabel: "Включити домени",
  excludeDomainsLabel: "Виключити домени",
  protocolsLabel: "Протоколи",
  protocolOther: "Інші",
  cleanupLabel: "Очищення",
  excludeLocalhost: "Виключити localhost",
  requireTitle: "Вимагати назву сторінки",
  previewButton: "Перегляд",
  exportButton: "Експортувати",
  cancelButton: "Скасувати",
  statusReady: "Готово до експорту",
  statusReadingHistory: "Читання історії",
  statusReadingArchive: "Читання локальних даних",
  statusFiltering: "Фільтрація",
  statusGrouping: "Групування доменів",
  statusCreatingFile: "Створення файлу",
  statusDownloading: "Запуск завантаження",
  statusExportComplete: "Експорт завершено",
  statusPreviewComplete: "Перегляд готовий",
  statusProcessingVisits: "Обробка відвідувань",
  statusImporting: "Імпорт",
  statusArchiveBackfill: "Архівація поточного періоду",
  statusCancelled: "Скасовано",
  statusNoRecords: "За вибраними налаштуваннями записів не знайдено",
  previewTitle: "Перегляд",
  previewEmpty: "Запустіть перегляд, щоб перевірити експорт.",
  previewStats: "$COUNT$ рядків, $DOMAINS$ доменів",
  previewShown: "Показано $SHOWN$ з $TOTAL$",
  takeoutTitle: "Імпорт Google Takeout",
  takeoutHint: "Виберіть BrowserHistory.json, CSV або ZIP Takeout з історією браузера.",
  importButton: "Імпортувати",
  clearTakeoutButton: "Очистити імпорт",
  importNoFiles: "Виберіть хоча б один файл Takeout.",
  importComplete: "Імпортовано записів: $COUNT$.",
  importCleared: "Імпортовані дані Takeout очищено.",
  archiveTitle: "Локальний архів",
  archiveHint: "Якщо увімкнути архів, нові відвідування зберігатимуться локально в цьому профілі браузера.",
  archiveEnableLabel: "Зберігати нові відвідування в локальний архів",
  backfillArchiveButton: "Архівувати поточний період",
  clearArchiveButton: "Очистити локальний архів",
  archiveEnabled: "Локальний архів увімкнено.",
  archiveDisabled: "Локальний архів вимкнено.",
  archiveStatus: "$ARCHIVE$ записів в архіві, $TAKEOUT$ імпортовано.",
  archiveBackfillComplete: "Архівовано записів з поточного періоду: $COUNT$.",
  archiveCleared: "Локальний архів очищено.",
  privacyTitle: "Приватність",
  privacyLocal: "Уся обробка виконується локально у браузері.",
  privacyNoServer: "Історія не надсилається на сервер.",
  privacyPermissions: "Дозволи обмежені історією, завантаженнями та локальним сховищем налаштувань.",
  privacyArchive: "Опційний архів зберігається в цьому профілі браузера через IndexedDB.",
  privacyTakeout: "Імпортовані дані Takeout залишаються локальними, доки ви їх не очистите.",
  exportFailedError: "Не вдалося експортувати історію",
  unknownFormatError: "Невідомий формат експорту",
  noColumnsError: "Виберіть хоча б один стовпець.",
  noSourcesError: "Виберіть хоча б одне джерело.",
  invalidDateRangeError: "Дата початку має бути раніше дати кінця.",
  zipUnsupportedError: "Цей запис ZIP стиснуто способом, який браузер не може прочитати.",
  noTakeoutRecordsError: "У вибраному файлі не знайдено записів історії браузера.",
  noDomain: "немає домену",
  sourceBrowserLabel: "Браузер",
  sourceArchiveLabel: "Архів",
  sourceTakeoutLabel: "Takeout",
  sheetVisits: "Відвідування",
  sheetDomains: "Домени"
};

const VISIT_COLUMNS = [
  { key: "visitTime", labelKey: "columnVisitTime", value: (row) => row.time, jsonKey: "visitTime" },
  { key: "title", labelKey: "columnPageTitle", value: (row) => row.title, jsonKey: "title" },
  { key: "domain", labelKey: "columnDomain", value: (row) => row.domain, jsonKey: "domain" },
  { key: "url", labelKey: "columnUrl", value: (row) => row.url, jsonKey: "url" },
  { key: "visitCount", labelKey: "columnVisitCount", value: (row) => row.visitCount, jsonKey: "visitCount" },
  { key: "typedCount", labelKey: "columnTypedCount", value: (row) => row.typedCount, jsonKey: "typedCount" },
  { key: "lastVisitTime", labelKey: "columnLastVisitTime", value: (row) => row.lastVisitTimeText, jsonKey: "lastVisitTime" },
  { key: "transition", labelKey: "columnTransition", value: (row) => row.transition, jsonKey: "transition" },
  { key: "referringVisitId", labelKey: "columnReferrer", value: (row) => row.referringVisitId, jsonKey: "referringVisitId" },
  { key: "source", labelKey: "columnSource", value: (row, locale) => sourceLabel(row.source, locale), jsonKey: "source" }
];
const SUMMARY_COLUMNS = [
  { key: "domain", labelKey: "columnDomain", value: (row) => row.domain, jsonKey: "domain" },
  { key: "visits", labelKey: "columnVisitCount", value: (row) => row.visits, jsonKey: "visits" },
  { key: "uniquePages", labelKey: "columnUniquePages", value: (row) => row.uniquePages, jsonKey: "uniquePages" },
  { key: "firstVisitTime", labelKey: "columnFirstVisitTime", value: (row) => row.firstVisitTimeText, jsonKey: "firstVisitTime" },
  { key: "lastVisitTime", labelKey: "columnLastVisitTime", value: (row) => row.lastVisitTimeText, jsonKey: "lastVisitTime" },
  { key: "topTitle", labelKey: "columnTopTitle", value: (row) => row.topTitle, jsonKey: "topTitle" },
  { key: "topUrl", labelKey: "columnTopUrl", value: (row) => row.topUrl, jsonKey: "topUrl" },
  { key: "source", labelKey: "columnSource", value: (row) => row.sources, jsonKey: "sources" }
];

const elements = {
  beginnerMode: document.getElementById("beginnerMode"),
  language: document.getElementById("language"),
  range: document.getElementById("range"),
  startDate: document.getElementById("startDate"),
  endDate: document.getElementById("endDate"),
  format: document.getElementById("format"),
  mode: document.getElementById("mode"),
  sourceBrowser: document.getElementById("sourceBrowser"),
  sourceArchive: document.getElementById("sourceArchive"),
  sourceTakeout: document.getElementById("sourceTakeout"),
  columnList: document.getElementById("columnList"),
  searchText: document.getElementById("searchText"),
  includeDomains: document.getElementById("includeDomains"),
  excludeDomains: document.getElementById("excludeDomains"),
  protocolHttps: document.getElementById("protocolHttps"),
  protocolHttp: document.getElementById("protocolHttp"),
  protocolOther: document.getElementById("protocolOther"),
  excludeLocalhost: document.getElementById("excludeLocalhost"),
  requireTitle: document.getElementById("requireTitle"),
  previewButton: document.getElementById("previewButton"),
  exportButton: document.getElementById("exportButton"),
  cancelButton: document.getElementById("cancelButton"),
  statusText: document.getElementById("statusText"),
  statusCount: document.getElementById("statusCount"),
  progress: document.getElementById("progress"),
  previewStats: document.getElementById("previewStats"),
  previewTable: document.getElementById("previewTable"),
  takeoutFiles: document.getElementById("takeoutFiles"),
  importButton: document.getElementById("importButton"),
  clearTakeoutButton: document.getElementById("clearTakeoutButton"),
  importStatus: document.getElementById("importStatus"),
  archiveEnabled: document.getElementById("archiveEnabled"),
  backfillArchiveButton: document.getElementById("backfillArchiveButton"),
  clearArchiveButton: document.getElementById("clearArchiveButton"),
  archiveStatus: document.getElementById("archiveStatus")
};

let activeLocale = detectInitialLocale();
let currentJob = null;
let busyState = false;

initializeDates();
restoreUiSettings();
applyLocalization();
applyInterfaceMode();
updateDateFields();
setupEventListeners();
void initializeArchiveControls();
void refreshArchiveStatus();

function setupEventListeners() {
  document.querySelectorAll("[data-tab-button]").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tabButton));
  });

  elements.language.addEventListener("change", () => {
    activeLocale = normalizeLocale(elements.language.value);
    saveUiSettings();
    applyLocalization();
    setProgress(t("statusReady"), "", 0);
    renderPreview([], null);
    void refreshArchiveStatus();
  });

  elements.beginnerMode.addEventListener("change", () => {
    applyInterfaceMode();
    saveUiSettings();
    setProgress(t("statusReady"), "", 0);
  });

  elements.range.addEventListener("change", () => {
    updateDateFields();
    saveUiSettings();
  });

  document.querySelectorAll("select, input, textarea").forEach((control) => {
    if (control.id !== "takeoutFiles" && control.id !== "language" && control.id !== "beginnerMode" && control.id !== "archiveEnabled") {
      control.addEventListener("change", saveUiSettings);
      control.addEventListener("input", saveUiSettings);
    }
  });

  elements.previewButton.addEventListener("click", () => runPreview());
  elements.exportButton.addEventListener("click", () => runExport());
  elements.cancelButton.addEventListener("click", () => {
    if (currentJob) {
      currentJob.cancelled = true;
    }
  });
  elements.importButton.addEventListener("click", () => runTakeoutImport());
  elements.clearTakeoutButton.addEventListener("click", () => clearSource("takeout", elements.importStatus, "importCleared"));
  elements.archiveEnabled.addEventListener("change", () => setArchiveEnabled(elements.archiveEnabled.checked));
  elements.backfillArchiveButton.addEventListener("click", () => backfillArchive());
  elements.clearArchiveButton.addEventListener("click", () => clearSource("archive", elements.archiveStatus, "archiveCleared"));
}

function activateTab(tabName) {
  document.querySelectorAll("[data-tab-button]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabButton === tabName);
  });
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === tabName);
  });
}

function applyInterfaceMode() {
  document.body.classList.toggle("novice-mode", isBeginnerMode());

  if (isBeginnerMode()) {
    activateTab("export");
  }
}

function isBeginnerMode() {
  return Boolean(elements.beginnerMode.checked);
}

function applyLocalization() {
  document.documentElement.lang = activeLocale;
  document.documentElement.dir = "ltr";
  elements.language.value = activeLocale;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
}

function t(key, locale = activeLocale) {
  const normalizedLocale = normalizeLocale(locale);
  return I18N[normalizedLocale]?.[key] || I18N[DEFAULT_LOCALE][key] || key;
}

function interpolate(templateKey, values, locale = activeLocale) {
  let text = t(templateKey, locale);
  Object.entries(values).forEach(([key, value]) => {
    text = text.replaceAll(`$${key}$`, String(value));
  });
  return text;
}

function detectInitialLocale() {
  const savedLocale = toSupportedLocale(readSavedSettings().locale);

  if (savedLocale) {
    return savedLocale;
  }

  const browserLocale = typeof chrome !== "undefined" && chrome.i18n?.getMessage
    ? chrome.i18n.getMessage("@@ui_locale")
    : "";
  const navigatorLocale = typeof navigator !== "undefined" ? navigator.language : "";
  return toSupportedLocale(browserLocale || navigatorLocale) || DEFAULT_LOCALE;
}

function normalizeLocale(locale) {
  return toSupportedLocale(locale) || DEFAULT_LOCALE;
}

function toSupportedLocale(locale) {
  const language = String(locale || "").toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LOCALES.includes(language) ? language : "";
}

function initializeDates() {
  elements.endDate.value = dateInputValue(Date.now());
  elements.startDate.value = dateInputValue(Date.now() - 7 * 24 * 60 * 60 * 1000);
}

function updateDateFields() {
  const isCustom = elements.range.value === "custom";
  elements.startDate.disabled = busyState || !isCustom;
  elements.endDate.disabled = busyState || !isCustom;
  elements.startDate.closest(".date-field")?.classList.toggle("is-hidden", !isCustom);
  elements.endDate.closest(".date-field")?.classList.toggle("is-hidden", !isCustom);
}

function readSavedSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  } catch {
    return {};
  }
}

function restoreUiSettings() {
  const settings = readSavedSettings();
  activeLocale = normalizeLocale(settings.locale || activeLocale);
  setChecked(elements.beginnerMode, settings.beginnerMode, false);
  setValue(elements.language, activeLocale);
  setValue(elements.range, settings.range);
  setValue(elements.startDate, settings.startDate);
  setValue(elements.endDate, settings.endDate);
  setValue(elements.format, settings.format);
  setValue(elements.mode, settings.mode);
  setChecked(elements.sourceBrowser, settings.sourceBrowser, true);
  setChecked(elements.sourceArchive, settings.sourceArchive, false);
  setChecked(elements.sourceTakeout, settings.sourceTakeout, false);
  setValue(elements.searchText, settings.searchText);
  setValue(elements.includeDomains, settings.includeDomains);
  setValue(elements.excludeDomains, settings.excludeDomains);
  setChecked(elements.protocolHttps, settings.protocolHttps, true);
  setChecked(elements.protocolHttp, settings.protocolHttp, true);
  setChecked(elements.protocolOther, settings.protocolOther, true);
  setChecked(elements.excludeLocalhost, settings.excludeLocalhost, false);
  setChecked(elements.requireTitle, settings.requireTitle, false);

  if (Array.isArray(settings.columns)) {
    columnInputs().forEach((input) => {
      input.checked = settings.columns.includes(input.value);
    });
  }
}

function saveUiSettings() {
  const settings = {
    locale: activeLocale,
    beginnerMode: elements.beginnerMode.checked,
    range: elements.range.value,
    startDate: elements.startDate.value,
    endDate: elements.endDate.value,
    format: elements.format.value,
    mode: elements.mode.value,
    sourceBrowser: elements.sourceBrowser.checked,
    sourceArchive: elements.sourceArchive.checked,
    sourceTakeout: elements.sourceTakeout.checked,
    columns: selectedColumnKeys({ allowEmpty: true }),
    searchText: elements.searchText.value,
    includeDomains: elements.includeDomains.value,
    excludeDomains: elements.excludeDomains.value,
    protocolHttps: elements.protocolHttps.checked,
    protocolHttp: elements.protocolHttp.checked,
    protocolOther: elements.protocolOther.checked,
    excludeLocalhost: elements.excludeLocalhost.checked,
    requireTitle: elements.requireTitle.checked
  };

  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Settings are optional. The exporter still works without localStorage.
  }
}

function setValue(element, value) {
  if (typeof value === "string" && value !== "") {
    element.value = value;
  }
}

function setChecked(element, value, fallback) {
  element.checked = typeof value === "boolean" ? value : fallback;
}

async function initializeArchiveControls() {
  const settings = await chromeStorageGet({ [ARCHIVE_ENABLED_KEY]: false });
  elements.archiveEnabled.checked = Boolean(settings[ARCHIVE_ENABLED_KEY]);
}

async function setArchiveEnabled(isEnabled) {
  await chromeStorageSet({ [ARCHIVE_ENABLED_KEY]: isEnabled });
  elements.archiveStatus.textContent = t(isEnabled ? "archiveEnabled" : "archiveDisabled");
  await refreshArchiveStatus();
}

async function runPreview() {
  const job = startJob("statusReadingHistory");

  try {
    const options = readOptions();
    const { records, rows } = await loadPreparedRows(options, job);
    renderPreview(rows, options, records);
    setProgress(t("statusPreviewComplete"), String(rows.length), 100);
  } catch (error) {
    handleJobError(error);
  } finally {
    finishJob(job);
  }
}

async function runExport() {
  const job = startJob("statusReadingHistory");

  try {
    const options = readOptions();
    const { records, rows } = await loadPreparedRows(options, job);

    if (rows.length === 0) {
      renderPreview(rows, options, records);
      setProgress(t("statusNoRecords"), "", 0);
      return;
    }

    renderPreview(rows, options, records);
    setProgress(t("statusCreatingFile"), String(rows.length), 95);
    const blob = buildExportBlob(rows, options);
    assertNotCancelled(job);
    setProgress(t("statusDownloading"), String(rows.length), 98);
    await downloadBlob(blob, createFilename(options));
    setProgress(t("statusExportComplete"), String(rows.length), 100);
  } catch (error) {
    handleJobError(error);
  } finally {
    finishJob(job);
  }
}

function startJob(statusKey) {
  const job = { cancelled: false };
  currentJob = job;
  setBusy(true);
  setProgress(t(statusKey), "", 0);
  return job;
}

function finishJob(job) {
  if (currentJob === job) {
    currentJob = null;
  }
  setBusy(false);
}

function handleJobError(error) {
  if (error?.name === "CancelledError") {
    setProgress(t("statusCancelled"), "", 0);
    return;
  }

  setProgress(error?.message || t("exportFailedError"), "", 0);
  console.error(error);
}

function assertNotCancelled(job) {
  if (job?.cancelled) {
    const error = new Error(t("statusCancelled"));
    error.name = "CancelledError";
    throw error;
  }
}

function readOptions({ validateSources = true, validateColumns = true } = {}) {
  const { startTime, endTime, rangeLabel } = readDateRange();
  const beginnerMode = isBeginnerMode();
  const sources = beginnerMode
    ? { browser: true, archive: false, takeout: false }
    : {
      browser: elements.sourceBrowser.checked,
      archive: elements.sourceArchive.checked,
      takeout: elements.sourceTakeout.checked
    };
  const columns = selectedColumnKeys();
  const mode = beginnerMode ? "visits" : elements.mode.value;

  if (validateSources && !sources.browser && !sources.archive && !sources.takeout) {
    throw new Error(t("noSourcesError"));
  }

  if (validateColumns && mode === "visits" && columns.length === 0) {
    throw new Error(t("noColumnsError"));
  }

  return {
    locale: activeLocale,
    range: elements.range.value,
    rangeLabel,
    startTime,
    endTime,
    format: elements.format.value,
    mode,
    sources,
    columns,
    filters: beginnerMode ? defaultFilters() : readFilters()
  };
}

function readDateRange() {
  const range = elements.range.value;
  const now = Date.now();

  if (range === "all") {
    return { startTime: 0, endTime: Number.MAX_SAFE_INTEGER, rangeLabel: "all" };
  }

  if (range === "custom") {
    const startTime = parseDateStart(elements.startDate.value);
    const endTime = parseDateEnd(elements.endDate.value);

    if (startTime > endTime) {
      throw new Error(t("invalidDateRangeError"));
    }

    return {
      startTime,
      endTime,
      rangeLabel: `${elements.startDate.value || "start"}_${elements.endDate.value || "end"}`
    };
  }

  const days = Number(range);
  return {
    startTime: now - days * 24 * 60 * 60 * 1000,
    endTime: now,
    rangeLabel: `last-${days}-days`
  };
}

function readFilters() {
  return {
    search: normalizeText(elements.searchText.value).toLowerCase(),
    includeDomains: parseFilterList(elements.includeDomains.value),
    excludeDomains: parseFilterList(elements.excludeDomains.value),
    protocols: {
      https: elements.protocolHttps.checked,
      http: elements.protocolHttp.checked,
      other: elements.protocolOther.checked
    },
    excludeLocalhost: elements.excludeLocalhost.checked,
    requireTitle: elements.requireTitle.checked
  };
}

function defaultFilters() {
  return {
    search: "",
    includeDomains: [],
    excludeDomains: [],
    protocols: {
      https: true,
      http: true,
      other: true
    },
    excludeLocalhost: false,
    requireTitle: false
  };
}

function selectedColumnKeys({ allowEmpty = false } = {}) {
  const keys = columnInputs()
    .filter((input) => input.checked)
    .map((input) => input.value);

  return allowEmpty ? keys : keys.filter((key) => VISIT_COLUMNS.some((column) => column.key === key));
}

function columnInputs() {
  return [...elements.columnList.querySelectorAll("input[type='checkbox']")];
}

async function loadPreparedRows(options, job) {
  const records = await loadFilteredRecords(options, job);
  assertNotCancelled(job);

  if (options.mode === "domains") {
    setProgress(t("statusGrouping"), String(records.length), 92);
    const rows = buildDomainSummary(records, options.locale);
    return { records, rows };
  }

  return { records, rows: records };
}

async function loadFilteredRecords(options, job) {
  const records = [];

  if (options.sources.browser) {
    records.push(...await readBrowserHistory(options, job));
  }

  if (options.sources.archive || options.sources.takeout) {
    setProgress(t("statusReadingArchive"), "", 88);
    const sources = [];
    if (options.sources.archive) sources.push("archive");
    if (options.sources.takeout) sources.push("takeout");
    records.push(...await readStoredRecords(options, sources));
  }

  assertNotCancelled(job);
  setProgress(t("statusFiltering"), String(records.length), 90);

  return mergeRecords(records)
    .filter((record) => isRecordInRange(record, options))
    .filter((record) => matchesFilters(record, options.filters))
    .sort((a, b) => b.visitTime - a.visitTime);
}

async function readBrowserHistory(options, job) {
  const pages = await readHistoryPages(options.startTime, options.endTime);
  const visits = [];
  const batchSize = 25;

  for (let index = 0; index < pages.length; index += batchSize) {
    assertNotCancelled(job);
    const batch = pages.slice(index, index + batchSize);
    const batchVisits = await Promise.all(batch.map((page) => readPageVisits(page, options)));
    visits.push(...batchVisits.flat());
    setProgress(
      t("statusProcessingVisits"),
      `${Math.min(index + batch.length, pages.length)}/${pages.length}`,
      progressValue(index + batch.length, pages.length, 86)
    );
  }

  return visits;
}

async function readHistoryPages(startTime, endTime) {
  const query = {
    text: "",
    startTime,
    maxResults: ALL_HISTORY_MAX_RESULTS
  };

  if (Number.isFinite(endTime) && endTime < Number.MAX_SAFE_INTEGER) {
    query.endTime = endTime;
  }

  return callChromeApi(chrome.history.search, query);
}

async function readPageVisits(page, options) {
  if (!page.url) {
    return [];
  }

  const pageVisits = await callChromeApi(chrome.history.getVisits, { url: page.url });
  const title = normalizeText(page.title) || page.url;
  const domain = extractDomain(page.url, options.locale);

  return pageVisits
    .filter((visit) => typeof visit.visitTime === "number")
    .filter((visit) => visit.visitTime >= options.startTime && visit.visitTime <= options.endTime)
    .map((visit) => createRecord({
      source: "browser",
      visitTime: visit.visitTime,
      title,
      url: page.url,
      domain,
      visitCount: page.visitCount,
      typedCount: page.typedCount,
      lastVisitTime: page.lastVisitTime,
      transition: visit.transition,
      referringVisitId: visit.referringVisitId
    }, options.locale));
}

async function callChromeApi(apiFunction, ...args) {
  return new Promise((resolve, reject) => {
    try {
      apiFunction(...args, (result) => {
        const error = chrome.runtime.lastError;
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

function createRecord(input, locale = activeLocale) {
  const visitTime = Number(input.visitTime || input.lastVisitTime || Date.now());
  const url = normalizeText(input.url);
  const domain = normalizeText(input.domain) || extractDomain(url, locale);
  const title = normalizeText(input.title) || url;
  const lastVisitTime = Number(input.lastVisitTime || visitTime);
  const source = normalizeSource(input.source);

  return {
    id: input.id || createRecordId(source, url, visitTime),
    source,
    visitTime,
    time: formatVisitTime(visitTime),
    title,
    domain,
    url,
    protocol: extractProtocol(url),
    visitCount: numberOrEmpty(input.visitCount),
    typedCount: numberOrEmpty(input.typedCount),
    lastVisitTime,
    lastVisitTimeText: formatVisitTime(lastVisitTime),
    transition: normalizeText(input.transition),
    referringVisitId: numberOrEmpty(input.referringVisitId)
  };
}

function createRecordId(source, url, visitTime) {
  return `${source}:${visitTime}:${stableHash(url)}`;
}

function normalizeSource(source) {
  return ["browser", "archive", "takeout"].includes(source) ? source : "archive";
}

function mergeRecords(records) {
  const priority = { browser: 3, takeout: 2, archive: 1 };
  const merged = new Map();

  records.forEach((record) => {
    const key = `${Math.round(record.visitTime)}:${record.url}`;
    const existing = merged.get(key);
    if (!existing || priority[record.source] > priority[existing.source]) {
      merged.set(key, record);
    }
  });

  return [...merged.values()];
}

function isRecordInRange(record, options) {
  return record.visitTime >= options.startTime && record.visitTime <= options.endTime;
}

function matchesFilters(record, filters) {
  const haystack = `${record.title} ${record.url} ${record.domain}`.toLowerCase();

  if (filters.search && !haystack.includes(filters.search)) {
    return false;
  }

  if (filters.includeDomains.length > 0 && !filters.includeDomains.some((filter) => domainMatches(record, filter))) {
    return false;
  }

  if (filters.excludeDomains.some((filter) => domainMatches(record, filter))) {
    return false;
  }

  if (filters.excludeLocalhost && isLocalhost(record.domain)) {
    return false;
  }

  if (filters.requireTitle && (!record.title || record.title === record.url)) {
    return false;
  }

  if (record.protocol === "https") {
    return filters.protocols.https;
  }

  if (record.protocol === "http") {
    return filters.protocols.http;
  }

  return filters.protocols.other;
}

function domainMatches(record, filter) {
  const normalized = filter.toLowerCase();
  const domain = String(record.domain || "").toLowerCase();
  const url = String(record.url || "").toLowerCase();
  return domain === normalized || domain.endsWith(`.${normalized}`) || url.includes(normalized);
}

function isLocalhost(domain) {
  const value = String(domain || "").toLowerCase();
  return value === "localhost" || value === "::1" || value.startsWith("127.") || value.endsWith(".local");
}

function parseFilterList(value) {
  return String(value || "")
    .split(/[\s,;]+/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function buildDomainSummary(records, locale) {
  const map = new Map();

  records.forEach((record) => {
    const key = record.domain || t("noDomain", locale);
    const existing = map.get(key) || {
      domain: key,
      visits: 0,
      pages: new Set(),
      titles: new Map(),
      urls: new Map(),
      sourcesSet: new Set(),
      firstVisitTime: record.visitTime,
      lastVisitTime: record.visitTime
    };

    existing.visits += 1;
    existing.pages.add(record.url);
    existing.sourcesSet.add(sourceLabel(record.source, locale));
    incrementMap(existing.titles, record.title);
    incrementMap(existing.urls, record.url);
    existing.firstVisitTime = Math.min(existing.firstVisitTime, record.visitTime);
    existing.lastVisitTime = Math.max(existing.lastVisitTime, record.visitTime);
    map.set(key, existing);
  });

  return [...map.values()]
    .map((item) => ({
      domain: item.domain,
      visits: item.visits,
      uniquePages: item.pages.size,
      firstVisitTime: item.firstVisitTime,
      firstVisitTimeText: formatVisitTime(item.firstVisitTime),
      lastVisitTime: item.lastVisitTime,
      lastVisitTimeText: formatVisitTime(item.lastVisitTime),
      topTitle: topMapValue(item.titles),
      topUrl: topMapValue(item.urls),
      sources: [...item.sourcesSet].join(", ")
    }))
    .sort((a, b) => b.visits - a.visits || a.domain.localeCompare(b.domain));
}

function incrementMap(map, key) {
  const normalized = normalizeText(key);
  if (normalized) {
    map.set(normalized, (map.get(normalized) || 0) + 1);
  }
}

function topMapValue(map) {
  let bestKey = "";
  let bestCount = -1;

  map.forEach((count, key) => {
    if (count > bestCount) {
      bestKey = key;
      bestCount = count;
    }
  });

  return bestKey;
}

function getOutputColumns(options) {
  if (options.mode === "domains") {
    return SUMMARY_COLUMNS;
  }

  return options.columns
    .map((key) => VISIT_COLUMNS.find((column) => column.key === key))
    .filter(Boolean);
}

function renderPreview(rows, options, records = []) {
  const tableHead = elements.previewTable.querySelector("thead");
  const tableBody = elements.previewTable.querySelector("tbody");

  if (!options) {
    tableHead.innerHTML = "";
    tableBody.innerHTML = `<tr><td>${escapeHtml(t("previewEmpty"))}</td></tr>`;
    elements.previewStats.textContent = "";
    return;
  }

  const columns = getOutputColumns(options);
  const shownRows = rows.slice(0, PREVIEW_LIMIT);
  tableHead.innerHTML = `<tr>${columns.map((column) => `<th>${escapeHtml(t(column.labelKey, options.locale))}</th>`).join("")}</tr>`;
  tableBody.innerHTML = shownRows.length === 0
    ? `<tr><td colspan="${Math.max(columns.length, 1)}">${escapeHtml(t("statusNoRecords", options.locale))}</td></tr>`
    : shownRows.map((row) => (
      `<tr>${columns.map((column) => `<td>${escapeHtml(columnValue(column, row, options.locale))}</td>`).join("")}</tr>`
    )).join("");

  const domainCount = new Set(records.map((record) => record.domain)).size || new Set(rows.map((row) => row.domain)).size;
  elements.previewStats.textContent = `${interpolate("previewStats", { COUNT: rows.length, DOMAINS: domainCount }, options.locale)} · ${interpolate("previewShown", { SHOWN: shownRows.length, TOTAL: rows.length }, options.locale)}`;
}

function buildExportBlob(rows, options) {
  const format = options.format;

  if (format === "xlsx") {
    return buildXlsxBlob(rows, options);
  }

  if (format === "csv") {
    return buildCsvBlob(rows, options);
  }

  if (format === "json") {
    return buildJsonBlob(rows, options);
  }

  if (format === "docx") {
    return buildDocxBlob(rows, options);
  }

  if (format === "txt") {
    return buildTxtBlob(rows, options);
  }

  if (format === "html") {
    return buildHtmlBlob(rows, options);
  }

  throw new Error(t("unknownFormatError", options.locale));
}

function buildCsvBlob(rows, options) {
  const columns = getOutputColumns(options);
  const csvRows = [
    columns.map((column) => t(column.labelKey, options.locale)),
    ...rows.map((row) => columns.map((column) => columnValue(column, row, options.locale)))
  ];
  const csv = `\ufeff${csvRows.map((row) => row.map(csvEscape).join(",")).join("\r\n")}`;
  return new Blob([csv], { type: MIME_TYPES.csv });
}

function buildJsonBlob(rows, options) {
  const columns = getOutputColumns(options);
  const payload = {
    generatedBy: t("jsonGeneratedBy", options.locale),
    generatedAt: new Date().toISOString(),
    language: options.locale,
    mode: options.mode,
    range: {
      preset: options.range,
      startTime: options.startTime,
      endTime: options.endTime,
      startTimeText: options.startTime ? formatVisitTime(options.startTime) : "",
      endTimeText: options.endTime < Number.MAX_SAFE_INTEGER ? formatVisitTime(options.endTime) : ""
    },
    columns: columns.map((column) => ({ key: column.jsonKey, label: t(column.labelKey, options.locale) })),
    count: rows.length,
    records: rows.map((row) => rowToJson(row, columns, options.locale))
  };
  return new Blob([JSON.stringify(payload, null, 2)], { type: MIME_TYPES.json });
}

function buildTxtBlob(rows, options) {
  const columns = getOutputColumns(options);
  return new Blob([rows.map((row) => formatRowLine(row, columns, options.locale)).join("\r\n")], { type: MIME_TYPES.txt });
}

function buildHtmlBlob(rows, options) {
  const columns = getOutputColumns(options);
  const title = t("htmlTitle", options.locale);
  const html = [
    "<!doctype html>",
    `<html lang="${escapeHtml(options.locale)}">`,
    "<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">",
    `<title>${escapeHtml(title)}</title>`,
    "<style>body{font-family:Arial,sans-serif;margin:24px;color:#17212b}.titlebar{display:flex;gap:12px;align-items:center;margin-bottom:14px}.titlebar img{width:48px;height:48px;object-fit:contain;flex:0 0 auto}h1{margin:0}.meta{color:#5c6873;margin:3px 0 0}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid #d6dde5;padding:7px;text-align:left;vertical-align:top}th{background:#eef3f5}td{overflow-wrap:anywhere}</style>",
    "</head><body>",
    `<div class="titlebar">${logoHtmlDataUri()}<div><h1>${escapeHtml(title)}</h1><p class="meta">${escapeHtml(new Date().toLocaleString())} · ${escapeHtml(String(rows.length))}</p></div></div>`,
    "<table><thead><tr>",
    columns.map((column) => `<th>${escapeHtml(t(column.labelKey, options.locale))}</th>`).join(""),
    "</tr></thead><tbody>",
    rows.map((row) => `<tr>${columns.map((column) => `<td>${escapeHtml(columnValue(column, row, options.locale))}</td>`).join("")}</tr>`).join(""),
    "</tbody></table></body></html>"
  ].join("");
  return new Blob([html], { type: MIME_TYPES.html });
}

function buildXlsxBlob(rows, options) {
  const columns = getOutputColumns(options);
  const tableRows = [
    columns.map((column) => t(column.labelKey, options.locale)),
    ...rows.map((row) => columns.map((column) => columnValue(column, row, options.locale)))
  ];
  const lastRow = Math.max(tableRows.length, 1);
  const lastColumn = columnName(Math.max(columns.length, 1));

  const rowXml = tableRows.map((row, rowIndex) => {
    const rowNumber = rowIndex + 1;
    const cells = row.map((value, columnIndex) => {
      const reference = `${columnName(columnIndex + 1)}${rowNumber}`;
      const style = rowIndex === 0 ? " s=\"1\"" : "";
      return `<c r="${reference}" t="inlineStr"${style}><is><t>${escapeXml(value)}</t></is></c>`;
    }).join("");
    return `<row r="${rowNumber}">${cells}</row>`;
  }).join("");

  const sheetName = t(options.mode === "domains" ? "sheetDomains" : "sheetVisits", options.locale);
  const files = {
    "[Content_Types].xml": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">",
      "<Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>",
      "<Default Extension=\"xml\" ContentType=\"application/xml\"/>",
      "<Override PartName=\"/xl/workbook.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\"/>",
      "<Override PartName=\"/xl/worksheets/sheet1.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>",
      "<Override PartName=\"/xl/styles.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml\"/>",
      "</Types>"
    ].join(""),
    "_rels/.rels": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">",
      "<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/>",
      "</Relationships>"
    ].join(""),
    "xl/workbook.xml": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\">",
      `<sheets><sheet name="${escapeXmlAttribute(sheetName)}" sheetId="1" r:id="rId1"/></sheets>`,
      "</workbook>"
    ].join(""),
    "xl/_rels/workbook.xml.rels": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">",
      "<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"worksheets/sheet1.xml\"/>",
      "<Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/>",
      "</Relationships>"
    ].join(""),
    "xl/styles.xml": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<styleSheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\">",
      "<fonts count=\"2\"><font><sz val=\"11\"/><name val=\"Calibri\"/></font><font><b/><sz val=\"11\"/><name val=\"Calibri\"/></font></fonts>",
      "<fills count=\"2\"><fill><patternFill patternType=\"none\"/></fill><fill><patternFill patternType=\"gray125\"/></fill></fills>",
      "<borders count=\"1\"><border><left/><right/><top/><bottom/><diagonal/></border></borders>",
      "<cellStyleXfs count=\"1\"><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\"/></cellStyleXfs>",
      "<cellXfs count=\"2\"><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\"/><xf numFmtId=\"0\" fontId=\"1\" fillId=\"0\" borderId=\"0\" xfId=\"0\" applyFont=\"1\"/></cellXfs>",
      "<cellStyles count=\"1\"><cellStyle name=\"Normal\" xfId=\"0\" builtinId=\"0\"/></cellStyles>",
      "</styleSheet>"
    ].join(""),
    "xl/worksheets/sheet1.xml": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\">",
      `<dimension ref="A1:${lastColumn}${lastRow}"/>`,
      "<sheetViews><sheetView workbookViewId=\"0\"><pane ySplit=\"1\" topLeftCell=\"A2\" activePane=\"bottomLeft\" state=\"frozen\"/></sheetView></sheetViews>",
      "<sheetFormatPr defaultRowHeight=\"15\"/>",
      `<cols>${columns.map((_, index) => `<col min="${index + 1}" max="${index + 1}" width="${index === 1 ? 56 : 24}" customWidth="1"/>`).join("")}</cols>`,
      `<sheetData>${rowXml}</sheetData>`,
      `<autoFilter ref="A1:${lastColumn}${lastRow}"/>`,
      "</worksheet>"
    ].join("")
  };

  return new Blob([createZip(files)], { type: MIME_TYPES.xlsx });
}

function buildDocxBlob(rows, options) {
  const columns = getOutputColumns(options);
  const paragraphs = rows.map((row) => (
    `<w:p><w:r><w:t xml:space="preserve">${escapeXml(formatRowLine(row, columns, options.locale))}</w:t></w:r></w:p>`
  )).join("");
  const created = new Date().toISOString();

  const files = {
    "[Content_Types].xml": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">",
      "<Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>",
      "<Default Extension=\"xml\" ContentType=\"application/xml\"/>",
      "<Override PartName=\"/word/document.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml\"/>",
      "<Override PartName=\"/docProps/core.xml\" ContentType=\"application/vnd.openxmlformats-package.core-properties+xml\"/>",
      "<Override PartName=\"/docProps/app.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.extended-properties+xml\"/>",
      "</Types>"
    ].join(""),
    "_rels/.rels": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">",
      "<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"word/document.xml\"/>",
      "<Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties\" Target=\"docProps/core.xml\"/>",
      "<Relationship Id=\"rId3\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties\" Target=\"docProps/app.xml\"/>",
      "</Relationships>"
    ].join(""),
    "docProps/core.xml": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<cp:coreProperties xmlns:cp=\"http://schemas.openxmlformats.org/package/2006/metadata/core-properties\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:dcterms=\"http://purl.org/dc/terms/\" xmlns:dcmitype=\"http://purl.org/dc/dcmitype/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">",
      `<dc:title>${escapeXml(t("extensionName", options.locale))}</dc:title>`,
      `<dc:creator>${escapeXml(t("extensionName", options.locale))}</dc:creator>`,
      `<dcterms:created xsi:type="dcterms:W3CDTF">${created}</dcterms:created>`,
      `<dcterms:modified xsi:type="dcterms:W3CDTF">${created}</dcterms:modified>`,
      "</cp:coreProperties>"
    ].join(""),
    "docProps/app.xml": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<Properties xmlns=\"http://schemas.openxmlformats.org/officeDocument/2006/extended-properties\" xmlns:vt=\"http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes\">",
      `<Application>${escapeXml(t("extensionName", options.locale))}</Application>`,
      "</Properties>"
    ].join(""),
    "word/document.xml": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>",
      "<w:document xmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\">",
      `<w:body>${paragraphs}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body>`,
      "</w:document>"
    ].join("")
  };

  return new Blob([createZip(files)], { type: MIME_TYPES.docx });
}

function columnValue(column, row, locale) {
  const value = column.value(row, locale);
  return value === undefined || value === null ? "" : String(value);
}

function rowToJson(row, columns, locale) {
  const object = {};

  columns.forEach((column) => {
    object[column.jsonKey] = columnValue(column, row, locale);
  });

  if ("visitTime" in row) object.visitTimeMs = row.visitTime;
  if ("firstVisitTime" in row) object.firstVisitTimeMs = row.firstVisitTime;
  if ("lastVisitTime" in row) object.lastVisitTimeMs = row.lastVisitTime;
  return object;
}

function formatRowLine(row, columns, locale) {
  return columns
    .map((column) => `${t(column.labelKey, locale)}: ${normalizeText(columnValue(column, row, locale))}`)
    .join(" | ");
}

async function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);

  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.append(link);
    link.click();
    link.remove();
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}

async function runTakeoutImport() {
  const files = [...elements.takeoutFiles.files];

  if (files.length === 0) {
    elements.importStatus.textContent = t("importNoFiles");
    return;
  }

  const job = startJob("statusImporting");

  try {
    const records = [];

    for (const file of files) {
      assertNotCancelled(job);
      records.push(...await readTakeoutFile(file, activeLocale));
      setProgress(t("statusImporting"), `${records.length}`, progressValue(records.length, Math.max(records.length + 1, 2), 85));
    }

    if (records.length === 0) {
      throw new Error(t("noTakeoutRecordsError"));
    }

    await putRecords(records);
    elements.sourceTakeout.checked = true;
    saveUiSettings();
    elements.importStatus.textContent = interpolate("importComplete", { COUNT: records.length });
    setProgress(t("statusExportComplete"), String(records.length), 100);
    await refreshArchiveStatus();
  } catch (error) {
    handleJobError(error);
    elements.importStatus.textContent = error?.message || t("exportFailedError");
  } finally {
    finishJob(job);
  }
}

async function readTakeoutFile(file, locale) {
  const name = file.name.toLowerCase();

  if (name.endsWith(".zip")) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const entries = await readZipTextEntries(bytes);
    return entries.flatMap((entry) => parseTakeoutText(entry.text, entry.name, locale));
  }

  return parseTakeoutText(await file.text(), file.name, locale);
}

function parseTakeoutText(text, name, locale) {
  const lowerName = name.toLowerCase();

  if (lowerName.endsWith(".csv")) {
    return parseTakeoutCsv(text, name, locale);
  }

  try {
    return parseTakeoutJson(text, name, locale);
  } catch {
    return parseTakeoutCsv(text, name, locale);
  }
}

function parseTakeoutJson(text, name, locale) {
  const data = JSON.parse(text);
  const items = [];
  collectHistoryItems(data, items);
  return items
    .map((item, index) => takeoutItemToRecord(item, `${name}:${index}`, locale))
    .filter(Boolean);
}

function collectHistoryItems(value, items) {
  if (Array.isArray(value)) {
    if (value.some(isHistoryLikeItem)) {
      value.filter(isHistoryLikeItem).forEach((item) => items.push(item));
      return;
    }

    value.forEach((item) => collectHistoryItems(item, items));
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectHistoryItems(item, items));
  }
}

function isHistoryLikeItem(item) {
  return Boolean(item && typeof item === "object" && (item.url || item.URL) && (
    item.time_usec || item.timeUsec || item.time || item.visitTime || item.lastVisitTime || item.timestamp
  ));
}

function parseTakeoutCsv(text, name, locale) {
  const rows = parseCsv(text);
  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((header) => normalizeHeader(header));
  return rows.slice(1)
    .map((row, index) => {
      const item = {};
      headers.forEach((header, columnIndex) => {
        item[header] = row[columnIndex];
      });
      return takeoutItemToRecord(item, `${name}:${index}`, locale);
    })
    .filter(Boolean);
}

function takeoutItemToRecord(item, idPart, locale) {
  const url = normalizeText(item.url || item.URL);
  if (!url) {
    return null;
  }

  const visitTime = parseTakeoutTime(item.time_usec || item.timeusec || item.timeUsec || item.time || item.visittime || item.visitTime || item.lastvisittime || item.lastVisitTime || item.timestamp);
  if (!visitTime) {
    return null;
  }

  return createRecord({
    id: createRecordId("takeout", `${idPart}:${url}`, visitTime),
    source: "takeout",
    visitTime,
    title: item.title || item.page_title || item.pagetitle || item.name || url,
    url,
    domain: extractDomain(url, locale),
    transition: item.page_transition || item.pagetransition || item.transition || "",
    lastVisitTime: visitTime
  }, locale);
}

function parseTakeoutTime(value) {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  if (typeof value === "string" && Number.isNaN(Number(value))) {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    return 0;
  }

  if (number > 10_000_000_000_000_000) {
    return Math.round(number / 1000 - CHROME_EPOCH_OFFSET_MS);
  }

  if (number > 100_000_000_000_000) {
    return Math.round(number / 1000);
  }

  if (number > 10_000_000_000) {
    return Math.round(number);
  }

  return Math.round(number * 1000);
}

async function readZipTextEntries(bytes) {
  const entries = [];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const eocdOffset = findEndOfCentralDirectory(bytes);

  if (eocdOffset < 0) {
    throw new Error(t("zipUnsupportedError"));
  }

  const entryCount = view.getUint16(eocdOffset + 10, true);
  let directoryOffset = view.getUint32(eocdOffset + 16, true);
  const decoder = new TextDecoder();

  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(directoryOffset, true) !== 0x02014b50) {
      break;
    }

    const method = view.getUint16(directoryOffset + 10, true);
    const compressedSize = view.getUint32(directoryOffset + 20, true);
    const nameLength = view.getUint16(directoryOffset + 28, true);
    const extraLength = view.getUint16(directoryOffset + 30, true);
    const commentLength = view.getUint16(directoryOffset + 32, true);
    const localOffset = view.getUint32(directoryOffset + 42, true);
    const name = decoder.decode(bytes.slice(directoryOffset + 46, directoryOffset + 46 + nameLength));
    directoryOffset += 46 + nameLength + extraLength + commentLength;

    if (!/\.(json|csv)$/i.test(name) || !/history/i.test(name)) {
      continue;
    }

    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = bytes.slice(dataStart, dataStart + compressedSize);
    let data;
    if (method === 0) {
      data = compressed;
    } else if (method === 8) {
      data = await inflateRaw(compressed);
    } else {
      throw new Error(t("zipUnsupportedError"));
    }
    entries.push({ name, text: decoder.decode(data) });
  }

  return entries;
}

function findEndOfCentralDirectory(bytes) {
  for (let index = bytes.length - 22; index >= 0; index -= 1) {
    if (bytes[index] === 0x50 && bytes[index + 1] === 0x4b && bytes[index + 2] === 0x05 && bytes[index + 3] === 0x06) {
      return index;
    }
  }

  return -1;
}

async function inflateRaw(bytes) {
  if (!("DecompressionStream" in globalThis)) {
    throw new Error(t("zipUnsupportedError"));
  }

  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function backfillArchive() {
  const job = startJob("statusArchiveBackfill");

  try {
    const options = readOptions({ validateSources: false, validateColumns: false });
    options.sources = { browser: true, archive: false, takeout: false };
    const records = await readBrowserHistory(options, job);
    const archiveRecords = records
      .filter((record) => matchesFilters(record, options.filters))
      .map((record) => createRecord({ ...record, source: "archive", id: createRecordId("archive", record.url, record.visitTime) }, options.locale));
    await putRecords(archiveRecords);
    elements.sourceArchive.checked = true;
    saveUiSettings();
    elements.archiveStatus.textContent = interpolate("archiveBackfillComplete", { COUNT: archiveRecords.length });
    setProgress(t("statusExportComplete"), String(archiveRecords.length), 100);
    await refreshArchiveStatus();
  } catch (error) {
    handleJobError(error);
    elements.archiveStatus.textContent = error?.message || t("exportFailedError");
  } finally {
    finishJob(job);
  }
}

async function clearSource(source, statusElement, messageKey) {
  await clearRecordsBySource(source);
  statusElement.textContent = t(messageKey);
  await refreshArchiveStatus();
}

async function refreshArchiveStatus() {
  try {
    const [archiveCount, takeoutCount] = await Promise.all([
      countRecordsBySource("archive"),
      countRecordsBySource("takeout")
    ]);
    elements.archiveStatus.textContent = interpolate("archiveStatus", { ARCHIVE: archiveCount, TAKEOUT: takeoutCount });
  } catch {
    elements.archiveStatus.textContent = "";
  }
}

async function readStoredRecords(options, sources) {
  const rawRecords = await getRecordsByRange(options.startTime, options.endTime, sources);
  return rawRecords.map((record) => createRecord(record, options.locale));
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

async function putRecords(records) {
  if (records.length === 0) {
    return;
  }

  const db = await openHistoryDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_RECORDS, "readwrite");
    const store = transaction.objectStore(STORE_RECORDS);
    records.forEach((record) => store.put(record));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

async function getRecordsByRange(startTime, endTime, sources) {
  const db = await openHistoryDb();
  const sourceSet = new Set(sources);
  const records = await new Promise((resolve, reject) => {
    const result = [];
    const transaction = db.transaction(STORE_RECORDS, "readonly");
    const index = transaction.objectStore(STORE_RECORDS).index("visitTime");
    const range = IDBKeyRange.bound(startTime, endTime);
    const request = index.openCursor(range);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        return;
      }
      if (sourceSet.has(cursor.value.source)) {
        result.push(cursor.value);
      }
      cursor.continue();
    };
    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
  return records;
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

async function countRecordsBySource(source) {
  const db = await openHistoryDb();
  const count = await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_RECORDS, "readonly");
    const request = transaction.objectStore(STORE_RECORDS).index("source").count(IDBKeyRange.only(source));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return count;
}

async function chromeStorageGet(defaults) {
  if (!chrome.storage?.local) {
    return defaults;
  }

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

async function chromeStorageSet(values) {
  if (!chrome.storage?.local) {
    return;
  }

  await new Promise((resolve, reject) => {
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

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === "\"" && next === "\"") {
        cell += "\"";
        index += 1;
      } else if (char === "\"") {
        quoted = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === "\"") {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value !== "")) {
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(header) {
  return String(header || "").trim().toLowerCase().replace(/[^a-z0-9_]+/g, "");
}

function createZip(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  Object.entries(files).forEach(([name, content]) => {
    const nameBytes = encoder.encode(name);
    const dataBytes = typeof content === "string" ? encoder.encode(content) : content;
    const crc = crc32(dataBytes);
    const { time, date } = dosDateTime(new Date());
    const localHeader = createLocalFileHeader(nameBytes, dataBytes.length, crc, time, date);
    const centralHeader = createCentralDirectoryHeader(nameBytes, dataBytes.length, crc, time, date, offset);

    localParts.push(localHeader, nameBytes, dataBytes);
    centralParts.push(centralHeader, nameBytes);
    offset += localHeader.length + nameBytes.length + dataBytes.length;
  });

  const centralOffset = offset;
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const endRecord = createEndOfCentralDirectory(Object.keys(files).length, centralSize, centralOffset);

  return concatUint8Arrays([...localParts, ...centralParts, endRecord]);
}

function createLocalFileHeader(nameBytes, size, crc, time, date) {
  const view = new DataView(new ArrayBuffer(30));
  writeUint32(view, 0, 0x04034b50);
  writeUint16(view, 4, 20);
  writeUint16(view, 6, 0x0800);
  writeUint16(view, 8, 0);
  writeUint16(view, 10, time);
  writeUint16(view, 12, date);
  writeUint32(view, 14, crc);
  writeUint32(view, 18, size);
  writeUint32(view, 22, size);
  writeUint16(view, 26, nameBytes.length);
  writeUint16(view, 28, 0);
  return new Uint8Array(view.buffer);
}

function createCentralDirectoryHeader(nameBytes, size, crc, time, date, offset) {
  const view = new DataView(new ArrayBuffer(46));
  writeUint32(view, 0, 0x02014b50);
  writeUint16(view, 4, 20);
  writeUint16(view, 6, 20);
  writeUint16(view, 8, 0x0800);
  writeUint16(view, 10, 0);
  writeUint16(view, 12, time);
  writeUint16(view, 14, date);
  writeUint32(view, 16, crc);
  writeUint32(view, 20, size);
  writeUint32(view, 24, size);
  writeUint16(view, 28, nameBytes.length);
  writeUint16(view, 30, 0);
  writeUint16(view, 32, 0);
  writeUint16(view, 34, 0);
  writeUint16(view, 36, 0);
  writeUint32(view, 38, 0);
  writeUint32(view, 42, offset);
  return new Uint8Array(view.buffer);
}

function createEndOfCentralDirectory(fileCount, centralSize, centralOffset) {
  const view = new DataView(new ArrayBuffer(22));
  writeUint32(view, 0, 0x06054b50);
  writeUint16(view, 4, 0);
  writeUint16(view, 6, 0);
  writeUint16(view, 8, fileCount);
  writeUint16(view, 10, fileCount);
  writeUint32(view, 12, centralSize);
  writeUint32(view, 16, centralOffset);
  writeUint16(view, 20, 0);
  return new Uint8Array(view.buffer);
}

function concatUint8Arrays(parts) {
  const totalLength = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  parts.forEach((part) => {
    result.set(part, offset);
    offset += part.length;
  });

  return result;
}

function crc32(bytes) {
  let crc = 0xffffffff;

  for (let index = 0; index < bytes.length; index += 1) {
    crc = CRC32_TABLE[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);

  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
    }
    table[index] = value >>> 0;
  }

  return table;
})();

function dosDateTime(dateValue) {
  const year = Math.max(dateValue.getFullYear(), 1980);
  return {
    time: (dateValue.getHours() << 11) | (dateValue.getMinutes() << 5) | Math.floor(dateValue.getSeconds() / 2),
    date: ((year - 1980) << 9) | ((dateValue.getMonth() + 1) << 5) | dateValue.getDate()
  };
}

function writeUint16(view, offset, value) {
  view.setUint16(offset, value, true);
}

function writeUint32(view, offset, value) {
  view.setUint32(offset, value >>> 0, true);
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

function dateInputValue(timestamp) {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function parseDateStart(value) {
  if (!value) {
    return 0;
  }

  return new Date(`${value}T00:00:00`).getTime();
}

function parseDateEnd(value) {
  if (!value) {
    return Number.MAX_SAFE_INTEGER;
  }

  return new Date(`${value}T23:59:59.999`).getTime();
}

function createFilename(options) {
  const stamp = formatVisitTime(Date.now()).replaceAll(":", "-").replace(" ", "_");
  const range = sanitizeFilenamePart(options.rangeLabel || options.range);
  return `history-${options.mode}-${range}-${options.locale}-${stamp}.${options.format}`;
}

function sanitizeFilenamePart(value) {
  return String(value || "all").replace(/[^a-z0-9_-]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
}

function sourceLabel(source, locale = activeLocale) {
  if (source === "browser") return t("sourceBrowserLabel", locale);
  if (source === "takeout") return t("sourceTakeoutLabel", locale);
  return t("sourceArchiveLabel", locale);
}

function setBusy(isBusy) {
  busyState = isBusy;
  document.querySelectorAll("button, input, select, textarea").forEach((element) => {
    if (element.id === "cancelButton") {
      element.hidden = !isBusy;
      element.disabled = !isBusy;
      return;
    }
    element.disabled = isBusy;
  });
  updateDateFields();
}

function setProgress(text, count, value) {
  elements.statusText.textContent = text;
  elements.statusCount.textContent = count;
  elements.progress.hidden = value <= 0;
  elements.progress.value = value;
}

function progressValue(done, total, max = 90) {
  if (!total) {
    return 0;
  }

  return Math.min(max, Math.round((done / total) * max));
}

function normalizeText(value) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractDomain(url, locale = activeLocale) {
  try {
    const parsed = new URL(url);
    return parsed.hostname || parsed.protocol.replace(":", "") || t("noDomain", locale);
  } catch {
    return t("noDomain", locale);
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

function stableHash(value) {
  let hash = 0;
  const text = String(value || "");

  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }

  return (hash >>> 0).toString(36);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
}

function escapeXml(value) {
  return String(value)
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");
}

function escapeXmlAttribute(value) {
  return escapeXml(value);
}

function escapeHtml(value) {
  return escapeXml(value);
}

function logoHtmlDataUri() {
  return `<img alt="" src="${LOGO_EXPORT_DATA_URI}">`;
}

function columnName(index) {
  let name = "";
  let current = index;

  while (current > 0) {
    current -= 1;
    name = String.fromCharCode(65 + (current % 26)) + name;
    current = Math.floor(current / 26);
  }

  return name;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}
