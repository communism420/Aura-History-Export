# Aura History Export Firefox Add-ons Release Checklist

## Package

- Version: `1.0.3`.
- Minimum browser: Firefox Desktop 142.
- Upload: `dist/aura-history-export-firefox-1.0.3.zip`.
- SHA-256: `5F39602A38ADEBF635FE054A2FFB638F89188A858492A7D948B119226346D82B`.
- Do not upload the Chromium ZIP, CRX, or private PEM key to AMO.

## Package Validation

- Confirm the root `manifest.json` matches `manifests/firefox.json`.
- Confirm the manifest has `background.scripts` and no `background.service_worker`.
- Confirm `browser_specific_settings.gecko.strict_min_version` is `142.0`.
- Confirm `browser_specific_settings.gecko.data_collection_permissions.required` is `["none"]`.
- Run `web-ext lint` and require 0 errors, 0 warnings, and 0 notices.
- Load the package temporarily in a clean Firefox profile and check the popup, preview, every export format, Takeout import, and local archive.

## Listing

- Use the summary, description, settings, and reviewer notes from `firefox-addons/listing.md`.
- Select Bookmarks and Privacy & Security as categories.
- Select the MIT License.
- Mark Experimental as No.
- Mark payment/paid services as No.
- Mark that the add-on has a privacy policy.
- Set the support email to `yarik.vereshchagin1996@gmail.com`.
- Set the support website to `https://aurahistoryexport.pages.dev/`.
- Set the privacy policy URL to `https://aurahistoryexport.pages.dev/privacy-policy.html`.

## Before Submission

- Confirm the official site shows version `1.0.3` and Firefox compatibility.
- Confirm the privacy policy is public over HTTPS and includes the Firefox data-collection declaration.
- Confirm the source repository contains the same version submitted to AMO.
- Explain that there is no build step and no separate source archive is necessary.
- Submit the version for Mozilla review.
- After approval, confirm `https://addons.mozilla.org/firefox/addon/aura-history-export/` is public and replace the pending status on the official website with the live store link.
