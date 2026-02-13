# Habit Magic - Deployment & Security Notes

## Current Setup
- **Hosting**: GitHub Pages (free)
- **Deploy branch**: `claude/rpm-goal-tracker-app-Bc0eH`
- **Domain**: myhabitmagic.com (custom domain with HTTPS)
- **Repo**: PUBLIC (required for free GitHub Pages)
- **Code protection**: Minified JS/CSS (app.min.js, styles.min.css)

## Important Rules
1. **DO NOT make the repo private** — GitHub Pages on free accounts only works with PUBLIC repos. Making it private will take the site down immediately (404 error).
2. **Always push to BOTH branches**:
   ```
   git push origin HEAD:claude/rpm-goal-tracker-app-Bc0eH
   git push origin HEAD:master
   ```
3. **After editing app.js or styles.css**, run `./build.sh` to regenerate minified files before pushing.

## Minification
- `app.js` (271KB) → `app.min.js` (138KB) — 49% smaller
- `styles.css` (116KB) → `styles.min.css` (85KB) — 27% smaller
- `index.html` references the `.min` files
- Build tool: `terser` (JS) + `clean-css-cli` (CSS)
- Run `./build.sh` to rebuild

## Options to Make Repo Private (Future)
1. **GitHub Pro** ($4/month) — allows private repo + GitHub Pages
2. **Move to Hostinger** — deploy via FTP/SFTP, then make GitHub repo private for free
   - User already pays for Hostinger hosting
   - Would need FTP credentials + target folder (usually `public_html/`)
   - Can set up GitHub Actions for auto-deploy

## Git Setup
- **Remote**: `origin https://github.com/igrushkas/hello-world.git`
- **Local branch**: `pages-update`
- **Deploy branch**: `claude/rpm-goal-tracker-app-Bc0eH`
- **Backup branch**: `master`

## Tech Stack
- Frontend: Vanilla JS, CSS (no framework)
- Backend: Firebase Auth (Google OAuth) + Firestore
- Audio: 10 Mixkit MP3 celebration sounds in `/audio/`
- Payments: Lemon Squeezy webhook via Firebase Cloud Function
