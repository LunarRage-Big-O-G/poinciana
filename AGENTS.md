# AGENTS.md

## Cursor Cloud specific instructions

**Product:** Poinciana — a front-end-only SPA for vacation property listings with interactive 3D Spline views. No backend, no database.

**Tech stack:** React 19, TypeScript, Vite, TanStack Router + Query, Spline 3D.

**Package manager:** npm (lockfile: `package-lock.json`).

### Development commands

See `package.json` scripts and `README.md`. Key commands:

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite on `localhost:5173`) |
| Lint | `npm run lint` |
| Build | `npm run build` (`tsc -b && vite build`) |

### Notes

- There are no automated tests configured in this project.
- Spline 3D scenes load from external CDN (`prod.spline.design`); internet access is required for 3D viewer functionality.
- Google Fonts (DM Sans) also load from CDN.
- The "API" layer in `src/lib/propertyQueries.ts` is simulated with `setTimeout` against static data in `src/data/properties.ts` — there is no real backend.
