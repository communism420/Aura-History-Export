# Chrome Web Store Privacy Practices Answers

Use these answers in the Developer Dashboard Privacy tab. Do not mark anything that the extension does not actually do.

## Single Purpose

Export, preview, import, filter, and locally archive browser history as local files.

## Permission Justifications

### `history`

Required to read browser history records selected by the user for export, preview, filtering, domain grouping, and optional local archive backfill.

### `storage`

Required to store local extension settings and the local archive enabled flag in the user's browser profile.

## User Data Disclosure

The extension handles web browsing activity locally because it reads browser history records for the user-facing export, preview, import, filtering, and local archive features.

Data handled locally may include:

- URLs
- page titles
- domains
- visit timestamps
- visit counts
- typed counts
- transition types
- referring visit IDs
- imported Google Takeout history records selected by the user
- local extension settings and archive records

## Data Collection / Transfer

The extension does not transmit user data to the developer or to any third-party server.

If the dashboard asks whether the extension "collects" data in the sense of developer/server collection, answer: no, the developer does not collect user data.

If the dashboard asks whether the extension "uses or handles" user data, disclose that it uses web browsing activity locally for the extension's single purpose.

## Limited Use Certification

Certify that:

- Data is used only for the extension's single purpose and visible user-facing features.
- Data is not sold.
- Data is not used or transferred for personalized advertising, retargeting, or interest-based advertising.
- Data is not transferred to third parties except if legally required or required for security, and the extension currently performs no such transfer.
- Humans cannot read user data through this extension because the extension does not transmit it.

## Remote Code

No remote code is used. All JavaScript, CSS, HTML, and image assets are packaged with the extension.

## Host Permissions

No host permissions are requested.

## Content Scripts

No content scripts are used and no website content is injected or modified.
