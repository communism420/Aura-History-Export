# Aura History Export

![Aura History Export logo](assets/logo.png)

## English

A fully open-source Chromium browser extension for exporting browsing history and maintaining a local archive.

### Features

- Export to `xlsx`, `csv`, `json`, `docx`, `txt`, and `html`.
- Date presets and custom date range.
- Export all available local history without a user page-count limit.
- Source selection: browser history, local archive, imported Google Takeout data.
- Column selection: time, title, domain, URL, visit count, typed count, last visit, transition, referrer visit ID, and data source.
- Filters for search, included/excluded domains, protocols, localhost, and empty page titles.
- Preview of the first 100 rows before export.
- Domain grouping with visit and unique-page counts.
- Google Takeout import from `BrowserHistory.json`, CSV, or ZIP files that contain history files.
- Optional local archive of new visits via IndexedDB.
- UI support for English, Russian, Spanish, German, French, Portuguese, and Ukrainian.
- Beginner mode with a dedicated switch: it shows only range, format, and export-column selection.

### Installation

1. Open `chrome://extensions` or the equivalent extensions page.
2. Enable developer mode.
3. Click `Load unpacked`.
4. Select the extension folder.

### Privacy

The extension works locally. History, the local archive, and imported Takeout files are not sent to servers. Permissions are limited to browser history and local settings storage.

### Chromium limitation

The extension can only read history that the Chromium API exposes from the local profile. For older data, import Google Takeout or enable the local archive in advance.

### Chrome Web Store release

Release materials are prepared in `chrome-web-store/`, the public privacy policy source is in `docs/`, and the upload ZIP is generated in `dist/`.

### License

This project is released under the MIT License. See `LICENSE`.

## Русский

Полностью open-source расширение для Chromium-браузеров, которое экспортирует историю посещений и помогает вести локальный архив.

### Возможности

- Экспорт в `xlsx`, `csv`, `json`, `docx`, `txt` и `html`.
- Пресеты периода и ручной диапазон дат.
- Экспорт всей доступной локальной истории без пользовательского лимита страниц.
- Выбор источников: история браузера, локальный архив, импортированные данные Google Takeout.
- Выбор столбцов: время, название, домен, URL, количество посещений, ручной ввод, последний визит, тип перехода, ID источника перехода, источник данных.
- Фильтры по поиску, включаемым/исключаемым доменам, протоколам, localhost и пустым названиям страниц.
- Предпросмотр первых 100 строк перед экспортом.
- Группировка по доменам с количеством посещений и уникальных страниц.
- Импорт Google Takeout из `BrowserHistory.json`, CSV или ZIP с файлами истории.
- Опциональный локальный архив новых посещений через IndexedDB.
- Интерфейс на русском, английском, испанском, немецком, французском, португальском и украинском.
- Режим новичка с отдельным переключателем: в нём доступны только период, формат и выбор столбцов экспорта.

### Установка

1. Откройте `chrome://extensions` или аналогичную страницу расширений.
2. Включите режим разработчика.
3. Нажмите `Load unpacked` / `Загрузить распакованное расширение`.
4. Выберите папку расширения.

### Приватность

Расширение работает локально. История, локальный архив и импортированные Takeout-файлы не отправляются на серверы. Используемые разрешения: история браузера и локальное хранилище настроек.

### Ограничение Chromium

Расширение может прочитать только ту историю, которую Chromium API отдаёт из локального профиля. Для более старых данных используйте импорт Google Takeout или включите локальный архив заранее.

### Релиз в Chrome Web Store

Материалы для публикации подготовлены в `chrome-web-store/`, исходник публичной политики конфиденциальности — в `docs/`, а ZIP для загрузки — в `dist/`.

### Лицензия

Проект распространяется по лицензии MIT. См. `LICENSE`.
