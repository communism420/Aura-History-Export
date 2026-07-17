# Mozilla Add-ons Listing: Aura History Export

Use these values for the Firefox Add-ons (AMO) listing for version `1.0.3`.

## Name

Aura History Export

## Add-on URL

https://addons.mozilla.org/firefox/addon/aura-history-export/

The URL can return `404` until Mozilla approves and publishes the first public version.

## Summary

Export Firefox browsing history to XLSX, CSV, JSON, DOCX, TXT, and HTML with local processing, filters, previews, and optional archiving.

## Description

Aura History Export exports the browsing history available in your current Firefox profile to useful local files.

Features:

- Export to XLSX, CSV, JSON, DOCX, TXT, and HTML.
- Choose Today, the last 24 hours, 7 days, 30 days, 90 days, all available history, or a custom date range.
- Select export columns and filter records by text, domain, protocol, localhost, and empty titles.
- Preview the first 100 rows and group results by domain.
- Import compatible Google Takeout history files from JSON, CSV, or ZIP.
- Optionally keep a local IndexedDB archive for future exports.
- Use a simplified Beginner mode or the full Expert mode.
- Use the interface in English, Russian, Spanish, German, French, Portuguese, or Ukrainian.

All processing happens locally in Firefox. The extension has no analytics, telemetry, ads, accounts, remote code, or external service calls. Browsing history, imported files, settings, and archive records are not sent to the developer or third parties.

Aura History Export is fully open source under the MIT License.

Source code: https://github.com/communism420/Aura-History-Export

Privacy policy: https://aurahistoryexport.pages.dev/privacy-policy.html

Compatibility: Firefox Desktop 142 or newer. Firefox for Android is not supported because the required History API is unavailable there.

## Listing Settings

- Experimental: No.
- Requires payment, paid services, or paid software: No.
- Categories: Bookmarks; Privacy & Security.
- Support email: `yarik.vereshchagin1996@gmail.com`.
- Support website: https://aurahistoryexport.pages.dev/
- License: MIT License.
- Has a privacy policy: Yes.
- Privacy policy URL: https://aurahistoryexport.pages.dev/privacy-policy.html

## Notes for Reviewers

No account, credentials, subscription, payment, or external service is required.

Suggested review steps:

1. Install the add-on in Firefox Desktop 142 or newer.
2. Open the toolbar popup.
3. In Beginner mode, select a range and export using the default file type.
4. Disable Beginner mode to access filters, Preview, Import, Archive, and Privacy controls.
5. Try Preview and export one or more formats.
6. Optionally import a local Google Takeout `BrowserHistory.json`, CSV, or ZIP file.
7. Optionally enable the local archive and archive the current range.

Expected behavior:

- Export files are generated locally through a Blob download.
- The add-on makes no network requests to developer or third-party services.
- The add-on requests only `history` and `storage`; it has no host permissions or content scripts.
- The package declares Firefox data collection as `required: ["none"]`.

Source and build information:

- The submitted ZIP contains readable, unminified source code.
- There is no build step, bundler, package manager dependency, or generated JavaScript.
- The Firefox release package uses `manifests/firefox.json` as the root `manifest.json` and contains only Firefox-supported background settings.
- No separate source archive is required because the submitted package is the source used by Firefox.
