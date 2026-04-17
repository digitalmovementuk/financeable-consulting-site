# Financeable Consulting Homepage

This repository contains a GitHub Pages-ready React/Vite build for the Financeable Consulting homepage, rebuilt with the motion language and section rhythm of the referenced Voxr site while using Financeable's business copy and positioning.

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

Pushing to `main` triggers the GitHub Pages workflow in `.github/workflows/deploy.yml`.
