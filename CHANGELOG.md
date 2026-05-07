# Changelog

## 1.0.1

- Changed browser-history export to use current `chrome.history.search` entries instead of expanding each URL into older visits from `chrome.history.getVisits`.
- Added aggressive current-history binding for local archive and imported Takeout records when browser history is selected, preventing deleted browser-history entries from reappearing through local caches.
- Added archive cleanup on `chrome.history.onVisitRemoved`, including full archive cleanup when all browser history is cleared.
- Added stale archive record cleanup during export/preview when local archive entries no longer match current browser history.
- Replaced undocumented `maxResults` zero behavior with an explicit high history query cap.
- Added CSV formula-injection protection for exported CSV cells.
- Improved localhost filtering for `[::1]`, `0.0.0.0`, and `*.localhost`.
- Improved local archive title capture by retrying history lookup shortly after `onVisited` when the initial title is empty.
- Fixed localized privacy text that incorrectly mentioned downloads permission.
- Updated the export mode label from "Every visit" to "Current history entries" to match the stricter current-history behavior.
- Updated Chrome Web Store test instructions for Beginner mode.
- Added `.gitignore` rules to keep private extension signing keys out of version control.
- Rebuilt release ZIP and CRX packages for version `1.0.1`.
