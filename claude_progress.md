# The Stock Bear 2 — Claude progress

Restaurant restock to-do app. Next.js 16 (App Router) + React 19 + TypeScript + CSS Modules + react-i18next (en, pt, fr, es, ko). Dark, notepad-like, mobile-first PWA. Static data in `src/data/` (no server).

## Spec summary
- Tabs: **Kitchen** (what's missing in the kitchen, grouped by kitchen location), **Stock** (same products grouped by stock location), **Tasks** (title, checkbox, optional desc + location).
- Product rows: name, the "other side" location (kitchen → where to grab it; stock → where it goes), qty stepper, check button. Tapping the row text also toggles.
- **Kitchen and Stock are synced per product** (`IProductProgress`): everything starts at 0. Kitchen stepper sets `need` (how many to grab). Stock shows **all** items; stepper counts `picked`/`need` (not capped).
- Completion and numbers are independent. A number change (need or picked) only **completes** a stock item when it lands on `picked === need` and it isn't done yet; numbers never un-complete, except one case: kitchen need going 0 → >0 reopens the stock item (otherwise every needed item would start done in stock). Initial state 0/0 = done. Check button only flips done, never touches numbers. Kitchen completes **only** via its button (numbers don't complete it). Kitchen sub-line shows "x/y picked".
- Done → dimmed + strikethrough.
- Hand setting (left/right) mirrors rows so the check button sits under the thumb. Bottom tab bar.
- Reset: header button (two taps) + "Restore all lists" in Settings — restores all three lists.
- Settings: move done to end (also sinks fully-done locations) vs keep position; hand side.
- Reorder animated with the View Transitions API (when supported, respects reduced motion).

## Structure
- `src/types/index.ts` — server interfaces + client state types
- `src/data/` — real data, no server: `locations.ts`, `products.ts`, `tasks.ts` (edit these by hand); `index.ts` re-exports them sorted by id (id order = display order of groups/items/tasks)
- `src/i18n/` — i18next init, `locales/{en,pt,fr,es,ko}.ts` (others typed as `Translation = typeof en`), typed keys (`i18next.d.ts`). Language is `settings.language` (store), chosen in Settings, first visit follows `navigator.language`; AppShell syncs it to i18next + `<html lang>`.
- `src/store/store.ts` — external store (`useSyncExternalStore`) persisted to localStorage `tsb2:state:v2`; actions `changeNeed`, `changePicked`, `toggleProduct`, `toggleTask`, `resetAll`, `updateSettings`
- `src/components/` — AppShell, ProductList, ProductRow, TaskList, ListGroup, CheckButton, ResetButton, SettingsSheet, ServiceWorkerRegister, icons
- PWA: `src/app/manifest.ts`, `src/app/icon.svg` (favicon), `src/app/apple-icon.png`, `public/icon*.png|svg`, `public/sw.js` (registered in production only), `npm run icons` regenerates PNGs from `public/icon.svg`

## Tasks
- [x] Scaffold Next app + install i18next/react-i18next
- [x] Types + mock data
- [x] i18n setup
- [x] Store (external store + localStorage)
- [x] UI: header, tab bar, ProductList, TaskList, settings sheet, reset
- [x] PWA: manifest, icons, sw, metadata/viewport, sw headers
- [x] `npm run build`, tsc, lint pass; UI checked in browser at 375px
- [x] Sync Kitchen ↔ Stock quantities (start at 0, kitchen sets need, stock counts picked)

## Open / next
- Service worker registration not verifiable inside Claude's built-in browser pane ("unknown error fetching script"; `/sw.js` itself serves 200). Check in Chrome: `npm run build && npm start` → DevTools > Application.
- No server integration planned; data lives in `src/data/`. Storage key is `tsb2:state:v4` (bump it when ids change meaning).

## Notes
- Testing on a phone with `npm run dev`: open `http://<PC LAN IP>:3000`. `allowedDevOrigins` in `next.config.ts` allows private-network IPs; without it Next 16 blocks dev JS from non-localhost origins and the page renders but nothing is clickable.
- No git on PATH in this environment.
