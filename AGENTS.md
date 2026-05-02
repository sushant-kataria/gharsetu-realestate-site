# GharSetu Development Guide

## Cursor Cloud specific instructions

### Overview

GharSetu is a **static website** (plain HTML, CSS, and vanilla JavaScript). There is no build step, no package manager, no backend, and no database.

### Running the dev server

Serve the site with any HTTP server from the repo root:

```sh
python3 -m http.server 8000 --directory /workspace
```

The homepage is at `http://localhost:8000/`. All `.html` files are navigable directly.

### Lint / Test / Build

- **Lint:** No linter is configured. HTML/CSS/JS files can be validated with standard tools (e.g., `npx htmlhint`, `npx stylelint`, `npx eslint`) but none are project dependencies.
- **Tests:** No automated test suite exists.
- **Build:** No build step; the site is served as-is.

### Key caveats

- External images (Unsplash) and Google Fonts require internet access. Without it, the site still works but with fallback fonts and missing hero images.
- Contact and Homes forms post to `formsubmit.co` — submissions require the recipient to activate the FormSubmit forwarding link on first use.
- Theme toggle (light/dark) state is persisted in `localStorage` under key `gs-theme`.
- The `vercel.json` file configures Vercel deployment (cache headers). It is not used for local development.
- The active development branch may be `cursor/theme-consistency-fixes-785b` (or similar) — check with the user or the Vercel preview URL to confirm which branch has the latest working code.
