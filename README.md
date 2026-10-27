# The Stock Bear

<img src="public/icon.svg" alt="The Stock Bear icon" width="96" />

A small, dark, notepad-style restock checklist for a restaurant kitchen. Made for one-hand use on a phone and installable as a PWA.

**Version 2.0.0**

## How it works

The app has three tabs:

- **Kitchen**: everything that lives in the kitchen, grouped by station. Walk around, check what is missing and set how many of each item you need with `−` / `+`.
- **Stock**: the same items grouped by where they are stored. Each one shows `picked / needed`. Tap `+` as you grab them, and the item completes when the numbers match (`2/2`). Items with nothing to grab (`0/0`) start out done.
- **Tasks**: a simple checklist with an optional description and location.

Kitchen and Stock share the same numbers: what you set in the kitchen is what you need to grab in stock. Completing an item (the round button) is separate from its numbers.

### Settings

- **Language**: English, Português, Français, Español, 한국어. The first visit follows the phone's language.
- **Move done items to the end**, or keep them in place.
- **Check button side** (left or right hand).
- **Restore all lists**: resets the three tabs. The ↺ button in the header does the same with two taps.

Progress and settings are saved in the browser (`localStorage`).

## Editing the data

There is no server. Locations, products and tasks live in `src/data/`:

| File | Content |
| --- | --- |
| `src/data/locations.ts` | Kitchen and stock locations |
| `src/data/products.ts` | Products and where they are in the kitchen and in stock |
| `src/data/tasks.ts` | Task list |

Lists are shown in **id order**: locations by id, items by id inside each location.

> If you change what an existing id means, bump `STORAGE_KEY` in `src/store/store.ts` so old saved progress is not applied to the wrong item.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules · i18next / react-i18next

## Scripts

```bash
npm install
npm run dev     # development, http://localhost:3000
npm run build   # production build
npm start       # production server (npm start -- -p 3001 for another port)
npm run lint
npm run icons   # regenerate the PNG icons from public/icon.svg
```

### Testing on a phone

Run `npm run dev` and open `http://<your PC's IP>:3000` on a phone connected to the same Wi-Fi. Local network IPs are allowed in `allowedDevOrigins` in `next.config.ts`.

### PWA

The manifest is `src/app/manifest.ts`, the icons are generated from `public/icon.svg` and the service worker is `public/sw.js`. The service worker is only registered in production builds, and installing on a phone needs HTTPS.

## Project structure

```
src/
  app/          layout, page, manifest, icons
  components/   AppShell, ProductList, ProductRow, TaskList, SettingsSheet, …
  data/         locations, products, tasks
  i18n/         i18next setup and locales (en, pt, fr, es, ko)
  store/        app state (useSyncExternalStore + localStorage)
  types/        shared types
```
