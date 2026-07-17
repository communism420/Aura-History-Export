# Aura History Export Chrome Web Store Release Checklist

## Done in This Repository

- Manifest V3 extension.
- No host permissions.
- No remote code.
- No analytics, telemetry, ads, or external service calls.
- `downloads` permission removed; exports download through a local Blob link.
- Required extension icon included in the ZIP package.
- Privacy policy prepared in `docs/privacy-policy.html` and `docs/privacy-policy.md`.
- Chrome Web Store listing copy prepared in `chrome-web-store/listing.md`.
- Privacy practice answers prepared in `chrome-web-store/privacy-practices.md`.
- Test instructions prepared in `chrome-web-store/test-instructions.md`.
- Store images prepared in `chrome-web-store/images`.
- Version `1.0.3` release ZIP prepared as `dist/aura-history-export-1.0.3.zip`.
- Official website and privacy policy prepared in `docs` for deployment at `https://aurahistoryexport.pages.dev/`.

## Must Be Done in the Developer Account

- Confirm `https://aurahistoryexport.pages.dev/privacy-policy.html` is public and shows the current policy.
- Paste `https://aurahistoryexport.pages.dev/privacy-policy.html` into the Chrome Web Store Developer Dashboard.
- Upload `dist/aura-history-export-1.0.3.zip`.
- Upload images from `chrome-web-store/images`.
- Paste the listing, privacy, and test instruction text from this folder.
- Set the support URL to `https://aurahistoryexport.pages.dev/` and verify the developer contact email.
- Complete Distribution settings.
- Submit for review.

## Recommended Before Submission

- Load the unpacked extension in a clean Chrome profile.
- Confirm the package manifest version is `1.0.3`.
- Test every export format.
- Test Beginner mode and Expert mode.
- Test Google Takeout import with a real sample.
- Test local archive enable, backfill, export, and clear.
- Confirm there are no extension console errors.
- Confirm the privacy policy URL is public and accessible without login.
