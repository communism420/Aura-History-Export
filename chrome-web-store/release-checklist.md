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
- Release ZIP prepared in `dist`.

## Must Be Done in the Developer Account

- Host `docs/privacy-policy.html` publicly over HTTPS, for example with GitHub Pages.
- Paste the public privacy policy URL into the Chrome Web Store Developer Dashboard.
- Upload the ZIP from `dist`.
- Upload images from `chrome-web-store/images`.
- Paste the listing, privacy, and test instruction text from this folder.
- Verify the developer contact/support URL.
- Complete Distribution settings.
- Submit for review.

## Recommended Before Submission

- Load the unpacked extension in a clean Chrome profile.
- Test every export format.
- Test Beginner mode and Expert mode.
- Test Google Takeout import with a real sample.
- Test local archive enable, backfill, export, and clear.
- Confirm there are no extension console errors.
- Confirm the privacy policy URL is public and accessible without login.
