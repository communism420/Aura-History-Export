# Aura History Export Privacy Policy

Last updated: April 24, 2026

Aura History Export is a Chromium extension for exporting browser history to local files and, when the user enables it, keeping a local browser-profile archive for future exports.

## Single Purpose

Aura History Export has one purpose: let the user export, import, filter, preview, and locally archive browser history data as local files.

## Data the Extension Handles

The extension may handle these data types inside the user's browser profile:

- Browser history records available through the Chromium History API, including URLs, page titles, domains, visit times, visit counts, typed counts, transition types, and referring visit IDs.
- Files the user explicitly imports from Google Takeout or compatible history exports.
- Local export settings, selected language, interface mode, filters, selected columns, and local archive settings.
- Optional local archive records saved after the user enables the local archive feature.

Aura History Export does not ask for account credentials, payment information, health information, precise location, contact lists, email content, messages, cookies, passwords, or authentication tokens.

## How Data Is Used

The extension uses browser history data only to provide the visible features requested by the user:

- build local export files;
- show local previews;
- apply user-selected filters and column choices;
- import user-selected Takeout/history files;
- maintain an optional local archive inside the current browser profile.

## Local Processing and Storage

All processing happens locally in the browser. The extension does not send browsing history, imported files, exported files, settings, or archive data to the developer or to any third-party server.

Settings are stored locally with browser storage mechanisms. Imported Takeout data and optional archive records are stored locally in IndexedDB in the current browser profile. Generated export files are saved only where the user's browser saves downloads.

Users can delete local extension data by using the clear controls in the extension, clearing browser extension/site data, or uninstalling the extension.

## Sharing and Transfer

Aura History Export does not sell, rent, share, transfer, or disclose user data to third parties. It does not use user data for advertising, retargeting, personalized ads, credit checks, or data-broker activity.

The extension contains no analytics, telemetry, remote code loading, tracking pixels, or external service calls.

## Chrome Web Store Limited Use Disclosure

Aura History Export's use of browser history data complies with the Chrome Web Store User Data Policy, including Limited Use requirements:

- Allowed use: browser history data is used only to provide and improve the extension's single purpose and user-facing export/archive/import features.
- Allowed transfer: the extension does not transfer user data to the developer or third parties.
- Prohibited advertising: user data is not used or transferred for advertising.
- Prohibited human interaction: no developer, employee, or contractor can read user history through the extension because the extension does not transmit it.

## Permissions

The extension requests these permissions:

- `history`: required to read browser history records selected for export, preview, filtering, and optional local archive backfill.
- `storage`: required to store local extension settings and the local archive enabled flag.

The extension does not request host permissions and does not inject content scripts into websites.

## Security

Because user data stays local, there is no network transmission of personal or sensitive user data by the extension. If this policy is hosted on a website, the website should be served over HTTPS.

## Children

Aura History Export is not directed to children under 13. The extension does not knowingly collect personal information from children.

## Changes

This policy may be updated when the extension's functionality or data practices change. Material changes should be reflected in the Chrome Web Store listing and in this policy before or at the time the updated extension is published.

## Contact

Use the developer contact channel listed on the Aura History Export Chrome Web Store page for privacy questions or deletion requests.

---

# Политика конфиденциальности Aura History Export

Дата обновления: 24 апреля 2026 года

Aura History Export - расширение Chromium для экспорта истории браузера в локальные файлы и, если пользователь включит эту функцию, ведения локального архива в профиле браузера.

## Основная цель

У Aura History Export одна цель: дать пользователю экспортировать, импортировать, фильтровать, просматривать и локально архивировать историю браузера в локальные файлы.

## Какие данные обрабатывает расширение

Расширение может обрабатывать внутри профиля браузера:

- записи истории браузера, доступные через Chromium History API: URL, названия страниц, домены, время посещений, количество посещений, количество ручных вводов, типы переходов и ID визитов-источников;
- файлы Google Takeout или совместимые файлы истории, которые пользователь явно выбрал для импорта;
- локальные настройки экспорта, выбранный язык, режим интерфейса, фильтры, выбранные столбцы и настройки локального архива;
- записи локального архива, если пользователь включил архивирование.

Aura History Export не запрашивает учетные данные, платежные данные, медицинские данные, точную геолокацию, контакты, содержимое писем и сообщений, cookies, пароли или токены авторизации.

## Как используются данные

История браузера используется только для видимых пользователю функций:

- создания локальных файлов экспорта;
- локального предпросмотра;
- применения выбранных фильтров и столбцов;
- импорта выбранных файлов Takeout/истории;
- ведения опционального локального архива в текущем профиле браузера.

## Локальная обработка и хранение

Вся обработка выполняется локально в браузере. Расширение не отправляет историю, импортированные файлы, экспортированные файлы, настройки или архивные записи разработчику или на сторонние серверы.

Настройки сохраняются локально средствами браузера. Импортированные данные Takeout и опциональный архив хранятся локально в IndexedDB текущего профиля браузера. Сгенерированные файлы сохраняются только туда, куда браузер пользователя сохраняет загрузки.

Пользователь может удалить локальные данные через кнопки очистки в расширении, через очистку данных браузера/расширений или удалив расширение.

## Передача данных

Aura History Export не продает, не сдает в аренду, не передает и не раскрывает пользовательские данные третьим лицам. Данные не используются для рекламы, ретаргетинга, персонализированной рекламы, скоринга или брокерской торговли данными.

В расширении нет аналитики, телеметрии, загрузки удаленного кода, отслеживающих пикселей или обращений к внешним сервисам.

## Раскрытие Limited Use для Chrome Web Store

Использование истории браузера в Aura History Export соответствует Chrome Web Store User Data Policy, включая Limited Use:

- разрешенное использование: история применяется только для основной цели расширения и пользовательских функций экспорта, архива и импорта;
- разрешенная передача: расширение не передает пользовательские данные разработчику или третьим лицам;
- запрет рекламы: пользовательские данные не используются и не передаются для рекламы;
- запрет чтения людьми: разработчик, сотрудники или подрядчики не могут читать историю пользователя через расширение, потому что расширение ее не отправляет.

## Разрешения

Расширение запрашивает:

- `history`: нужно для чтения истории браузера при экспорте, предпросмотре, фильтрации и опциональном заполнении локального архива;
- `storage`: нужно для локальных настроек расширения и флага включения локального архива.

Расширение не запрашивает host permissions и не внедряет content scripts на сайты.

## Безопасность

Так как пользовательские данные остаются локально, расширение не передает персональные или чувствительные данные по сети. Если эта политика размещается на сайте, сайт должен работать по HTTPS.

## Дети

Aura History Export не предназначено для детей младше 13 лет и не собирает намеренно личные данные детей.

## Изменения

Политика может обновляться при изменении функций или практик обработки данных. Существенные изменения должны отражаться в странице Chrome Web Store и этой политике до публикации обновления или одновременно с ним.

## Контакт

Для вопросов о приватности или удалении данных используйте контактный канал разработчика на странице Aura History Export в Chrome Web Store.
