# DEPLOY — Government Platform Demo

Static production build of the Government Digital Platform demo prototype, built for the document root of `https://citizen.oakbeautyapp.com/`. No backend, no database, no Node process required — every screen runs on mock data in the browser.

## 1. Folder to upload

```
design-system/preview-app/dist/
```

Contents (this exact set, ~765 KB total):

```
dist/
├── .htaccess
├── index.html
└── assets/
    ├── index-*.js
    ├── index-*.css
    └── *.woff2   (10 self-hosted font files)
```

Upload the **contents** of `dist/`, not the `dist` folder itself.

## 2. Upload steps — Hostinger File Manager

1. Log in to hPanel → **Files → File Manager**.
2. Navigate to the document root for `citizen.oakbeautyapp.com` (this subdomain is dedicated to the demo — it is safe to overwrite everything currently in this folder).
3. Delete the existing contents of that folder (the previous CAIOS app build). If you want a rollback option, download/zip the existing folder first before deleting.
4. Upload `index.html`, `.htaccess`, and the `assets/` folder from `dist/` into the now-empty document root.
5. Confirm the folder structure on the server matches section 1 exactly — `assets/` must sit next to `index.html`, not nested inside another folder.

## 3. .htaccess

Already included in `dist/.htaccess` — uploads automatically as part of step 4, no separate action needed. It does two things:

- Sets far-future cache headers on the hashed `assets/*.js|css|woff2` files (safe — filenames change on every rebuild) and no-cache on `index.html`.
- Adds a fallback rewrite to `index.html` for any unmatched path. This demo has no client-side routing (a single URL, all navigation is in-memory), so this isn't load-bearing today — it just prevents a stray deep link or trailing slash from ever showing a raw 404.

If your Hostinger plan doesn't have `mod_headers` or `mod_rewrite` enabled, the site still works without them — you'd just lose the cache-control headers and the 404 safety net, not core functionality.

## 4. Verification checklist after upload

Visit `https://citizen.oakbeautyapp.com/` and check:

- [ ] Page loads with no blank screen; hero, header, and footer render.
- [ ] Browser tab title reads "Cổng Dịch vụ công Số — Bản trình diễn".
- [ ] Open DevTools → Network: all requests (JS, CSS, fonts) return `200`, none `404`.
- [ ] Open DevTools → Console: no red errors.
- [ ] Click through: Landing → Đăng nhập → (MFA code, any 6 digits) → Citizen Dashboard.
- [ ] Portal switcher: Công dân → Doanh nghiệp → Cán bộ all load their own dashboard.
- [ ] Click a case row on the Citizen Dashboard → Case Detail (workflow timeline) loads → "Quay lại" returns correctly.
- [ ] Theme toggle (moon/sun icon) switches light/dark across the whole page.
- [ ] Language toggle (VI/EN) switches the Landing page content.
- [ ] Reload the page (F5) at any point — it comes back cleanly, no error page.
- [ ] Open on a phone (or resize browser to ~390px wide) — layout stacks correctly, nothing overflows horizontally.
- [ ] Floating AI Assistant button opens the chat panel.

If any asset 404s, the most likely cause is `assets/` not sitting directly next to `index.html` on the server — recheck step 5 above.
