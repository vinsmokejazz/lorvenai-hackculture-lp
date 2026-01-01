
# Lorven Landing Page (Frontend)

React + CRACO + Tailwind CSS landing page.

## Prerequisites

- Node.js 18+ recommended
- npm / yarn

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Run tests (CRA/CRACO test runner):

```bash
npm test
```

## Environment flags

This project uses CRACO and reads environment variables from `.env`.

- `ENABLE_HEALTH_CHECK=true` enables the webpack health-check plugin/endpoints.
- Visual edits tooling is enabled only during dev server (when `NODE_ENV !== "production"`).

## Project structure

- `src/pages/Home.jsx` — Main landing page composition
- `src/components/` — Page sections (Hero, Contact, etc.)
- `src/components/ui/` — UI primitives (Radix-based)
- `src/styles/Home.css` — Page-specific styling
- `public/` — Static assets

## Notes

- The animated hero CTA is implemented in `src/components/Hero.jsx` with styles in `src/styles/Home.css`.
- The header/navbar is styled in `src/styles/Home.css`.

v