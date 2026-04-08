# Luxora

Front-end for a **real estate and vacation booking** client: browse residences, preview optional **trip experiences** (excursions, activities, add-on services), and see a packaged **estimated total** before checkout.

Built with **React**, **Vite**, **TanStack Router**, and **TanStack Query**.

## Features

- Property listing grid and detail pages
- Optional experiences (toggle on the property page; totals update with nights + add-ons)
- Placeholder **Login** and **Continue to checkout** (wire to your auth and payment APIs)

## Run locally

```bash
npm install
npm run dev
```

## Where data lives

| Content        | File                      |
| -------------- | ------------------------- |
| Properties     | `src/data/properties.ts`  |
| Experiences    | `src/data/experiences.ts` |
| API simulation | `src/lib/propertyQueries.ts` |

Replace the query functions with `fetch` calls to your backend when ready.

## Build

```bash
npm run build
```
