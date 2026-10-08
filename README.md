# Vibe

Vibe is a polished, responsive frontend-only social platform demo. It uses React, TypeScript, Vite, Tailwind CSS, Framer Motion, and local browser storage.

## Features

- Home feed with filters, posts, comments, likes, bookmarks, and post creation
- Explore feed with search and category filters
- Profile viewing and editing
- Notifications and message conversations
- Settings for appearance, reduced motion, and demo data reset
- Responsive desktop, tablet, and mobile layouts
- Lazy-loaded views and persisted local demo state

## Run locally

Prerequisites: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually http://localhost:3000.

## Quality checks

```bash
npm run check
npm run healthcheck
```

The health check validates that the production bundle exists and contains the expected HTML and compiled assets.

## Production build

```bash
npm run build
npm run preview
```

Deploy the generated `dist` directory to any static host such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages. No backend, database, API key, or server-side authentication is required.

## Architecture boundary

This repository intentionally implements a frontend-only demo. Authentication, authorization, account persistence, cross-user data synchronization, CSRF protections, CORS policies, and server-side validation must be implemented in a separate backend before the product is used with real user data.
