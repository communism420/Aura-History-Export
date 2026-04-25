# Chrome Web Store Test Instructions

Use this in the Developer Dashboard Test instructions tab.

No account, credentials, subscription, payment, or external service is required.

Suggested review steps:

1. Install the extension.
2. Open the extension popup from the toolbar.
3. Keep Beginner mode enabled and export the last 7 days using the default file type.
4. Turn Beginner mode off to access expert controls.
5. Try Preview, select columns, and apply optional filters.
6. Open Import and choose a local Google Takeout `BrowserHistory.json`, CSV, or ZIP file if available.
7. Open Archive, enable local archive, and use Archive current range if history is available.
8. Open Privacy to confirm the local-only disclosure.

Expected behavior:

- Exported files are generated locally.
- No network request to a developer server is required.
- The extension does not require login or host permissions.
