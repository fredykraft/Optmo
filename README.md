# OPTMO Website

OPTMO is a responsive single-page website for an AI-powered automation platform focused on content creation and event organization.

## Overview

- Content workflows: podcasts, videos, and music production
- Event workflows: performances, parties, and conferences
- Membership plans: Free, Pro, and Enterprise
- Interactive UI: sidebar navigation, section highlighting, project filtering, and cookie consent

## Tech Stack

- HTML5 (`index.html`)
- CSS3 (`css/styles.css`)
- Vanilla JavaScript (`js/main.js`)
- Font Awesome 6.4.0 icons (CDN)

## Project Structure

```
.
├── index.html
├── donate.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
├── README.md
└── README_NEW.md
```

## Local Development

1. Open this folder in VS Code.
2. Start a static server:

```bash
python -m http.server 8000
```

3. Visit `http://localhost:8000`.

## Included Interactions

- Sidebar open/close with overlay support
- Account menu dropdown toggle
- Scroll-based active navigation state
- Project card filtering by type
- Smooth scrolling for internal anchor links
- Cookie consent storage in `localStorage`

## Donate Page

- Public support page is available at `donate.html`.
- When hosted on GitHub Pages, visitors can open `/donate.html`.

## Secure Analytics Password Setup

1. Copy `js/private-config.example.js` to `js/private-config.js`.
2. Set `window.OPTMO_ANALYTICS_PASSWORD` in `js/private-config.js`.
3. Keep `js/private-config.js` uncommitted (already ignored by `.gitignore`).

This keeps the analytics password out of GitHub history.

## Notes

- The website is fully static and requires no build step.
- Analytics hooks in `js/main.js` are placeholders for real tracking integrations.
- For production-grade secrecy, validate passwords server-side (client-side static code cannot fully hide secrets from end users).

---

Last updated: February 28, 2026