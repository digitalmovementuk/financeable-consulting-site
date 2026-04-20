# Cuno Homepage

This repository contains a GitHub Pages-ready React/Vite build for the Cuno homepage.

The canonical homepage copy source now lives in `workspace/05_content/drafts/homepage-live-copy.md`, and the live implementation is in `src/App.tsx`.

Second design version:

- source: `src/AppV2.tsx`
- route: `/v2/`

Third design version (Apple-style refresh):

- source: `src/AppV3.tsx`
- styles: `src/v3.css`
- entry: `v3/index.html` via `src/v3-main.tsx`
- route: `/v3/`

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS v3
- GSAP + ScrollTrigger
- Framer Motion
- Swiper
- Lenis
- Playwright

## Local Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run build
npm run lint
npm run test:e2e
```

## Deployment

The repository is prepared for GitHub Pages static hosting. In the current environment, Pages deployment is published manually from the built `gh-pages` branch because the active GitHub token does not include workflow write scope.
