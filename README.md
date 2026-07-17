# Aura History Export

![Aura History Export logo](assets/logo.png)

## English

A fully open-source browser extension for exporting browsing history from Chromium-based browsers and Firefox, with an optional local archive.

### Features

- Export to `xlsx`, `csv`, `json`, `docx`, `txt`, and `html`.
- Date presets and custom date range.
- Export current browser history entries exposed by the browser's WebExtensions History API without a user page-count limit.
- Source selection: browser history, local archive, imported Google Takeout data.
- Column selection: time, title, domain, URL, visit count, typed count, last visit, transition, referrer visit ID, and data source.
- Filters for search, included/excluded domains, protocols, localhost, and empty page titles.
- Preview of the first 100 rows before export.
- Domain grouping with visit and unique-page counts.
- Google Takeout import from `BrowserHistory.json`, CSV, or ZIP files that contain history files.
- Optional local archive of new visits via IndexedDB.
- UI support for English, Russian, Spanish, German, French, Portuguese, and Ukrainian.
- Beginner mode with a dedicated switch: it shows only range, format, and export-column selection.

### Compatibility

- Chromium-based browsers version 121 or newer.
- Firefox Desktop version 142 or newer.

### Installation

Install from an official browser store:

Chromium-based browsers:

1. Open [Aura History Export in the Chrome Web Store](https://chromewebstore.google.com/detail/aura-history-export/fijdmhnlcbhdakojcljlpebkdgpippma).
2. Click `Add to Chrome`.
3. Confirm the installation when the browser asks for permission.

The first Firefox Add-ons release is being prepared for Mozilla review. Its public listing URL will become available after Mozilla publishes the version.

Manual installation in Chromium for development or local testing:

1. Open `chrome://extensions` or the browser's equivalent extensions page.
2. Enable developer mode.
3. Click `Load unpacked`.
4. Select the extension folder.

Temporary installation in Firefox for development or local testing:

1. Open `about:debugging#/runtime/this-firefox`.
2. Click `Load Temporary Add-on`.
3. Select `manifest.json` from the extension folder.

For permanent Firefox distribution, submit `dist/aura-history-export-firefox-1.0.3.zip` to Mozilla Add-ons and use the signed package returned by Mozilla. The Firefox release ZIP uses `manifests/firefox.json` as its root `manifest.json` so AMO receives only Firefox-supported background settings.

### Release packages

- `dist/aura-history-export-1.0.3.zip`: Chromium package for Chrome Web Store submission.
- `dist/aura-history-export-firefox-1.0.3.zip`: Firefox package for Mozilla Add-ons submission.
- `dist/aura-history-export.zip` and `dist/aura-history-export.crx`: current generic Chromium release artifacts.

The private Chromium signing key is intentionally excluded from the repository.

### Privacy

The extension works locally. History, the local archive, and imported Takeout files are not sent to servers. Permissions are limited to browser history and local settings storage.

### Browser history limitation

The extension can only read history that the current browser exposes from the local profile through the WebExtensions History API. For older data, import Google Takeout or enable the local archive in advance.

### License

This project is released under the MIT License. See `LICENSE`.

## Русский

Полностью open-source расширение для Chromium-браузеров и Firefox, которое экспортирует историю посещений и помогает вести локальный архив.

### Возможности

- Экспорт в `xlsx`, `csv`, `json`, `docx`, `txt` и `html`.
- Пресеты периода и ручной диапазон дат.
- Экспорт текущих записей истории, доступных через WebExtensions History API браузера, без пользовательского лимита страниц.
- Выбор источников: история браузера, локальный архив, импортированные данные Google Takeout.
- Выбор столбцов: время, название, домен, URL, количество посещений, ручной ввод, последний визит, тип перехода, ID источника перехода, источник данных.
- Фильтры по поиску, включаемым/исключаемым доменам, протоколам, localhost и пустым названиям страниц.
- Предпросмотр первых 100 строк перед экспортом.
- Группировка по доменам с количеством посещений и уникальных страниц.
- Импорт Google Takeout из `BrowserHistory.json`, CSV или ZIP с файлами истории.
- Опциональный локальный архив новых посещений через IndexedDB.
- Интерфейс на русском, английском, испанском, немецком, французском, португальском и украинском.
- Режим новичка с отдельным переключателем: в нём доступны только период, формат и выбор столбцов экспорта.

### Совместимость

- Chromium-браузеры версии 121 и новее.
- Firefox Desktop версии 142 и новее.

### Установка

Установка из официального магазина браузера:

Chromium-браузеры:

1. Откройте [Aura History Export в Chrome Web Store](https://chromewebstore.google.com/detail/aura-history-export/fijdmhnlcbhdakojcljlpebkdgpippma).
2. Нажмите `Add to Chrome` / `Установить`.
3. Подтвердите установку, когда браузер запросит разрешение.

Первый релиз для Firefox Add-ons готовится к проверке Mozilla. Публичная страница дополнения станет доступна после публикации версии Mozilla.

Ручная установка в Chromium для разработки или локального тестирования:

1. Откройте `chrome://extensions` или аналогичную страницу расширений.
2. Включите режим разработчика.
3. Нажмите `Load unpacked` / `Загрузить распакованное расширение`.
4. Выберите папку расширения.

Временная установка в Firefox для разработки или локального тестирования:

1. Откройте `about:debugging#/runtime/this-firefox`.
2. Нажмите `Load Temporary Add-on` / `Загрузить временное дополнение`.
3. Выберите `manifest.json` из папки расширения.

Для постоянного распространения в Firefox отправьте `dist/aura-history-export-firefox-1.0.3.zip` в Mozilla Add-ons и используйте подписанный Mozilla пакет. В Firefox ZIP файл `manifests/firefox.json` используется как корневой `manifest.json`, поэтому AMO получает только поддерживаемые Firefox настройки фонового скрипта.

### Пакеты релиза

- `dist/aura-history-export-1.0.3.zip`: Chromium-пакет для отправки в Chrome Web Store.
- `dist/aura-history-export-firefox-1.0.3.zip`: Firefox-пакет для отправки в Mozilla Add-ons.
- `dist/aura-history-export.zip` и `dist/aura-history-export.crx`: текущие универсальные артефакты Chromium-релиза.

Приватный ключ подписи Chromium намеренно исключен из репозитория.

### Приватность

Расширение работает локально. История, локальный архив и импортированные Takeout-файлы не отправляются на серверы. Используемые разрешения: история браузера и локальное хранилище настроек.

### Ограничение истории браузера

Расширение может прочитать только ту историю, которую текущий браузер отдаёт из локального профиля через WebExtensions History API. Для более старых данных используйте импорт Google Takeout или включите локальный архив заранее.

### Лицензия

Проект распространяется по лицензии MIT. См. `LICENSE`.
