'use client'

import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import { products, tasks } from '@/data'
import { isLanguage } from '@/i18n'
import type { IDoneState, IProductProgress, ISettings, MainLocationNames } from '@/types'

export interface AppState {
  products: Record<number, IProductProgress>
  tasks: Record<number, IDoneState>
  settings: ISettings
}

const STORAGE_KEY = 'tsb2:state:v4'

const defaultSettings: ISettings = { moveDoneToEnd: true, hand: 'right', language: 'en' }

/** First visit: follow the phone's language when we have it. */
function detectLanguage(): ISettings['language'] {
  const code = window.navigator.language?.slice(0, 2).toLowerCase()
  return isLanguage(code) ? code : defaultSettings.language
}

const notDone: IDoneState = { done: false }

function freshProgress(): Pick<AppState, 'products' | 'tasks'> {
  return {
    products: Object.fromEntries(
      // Nothing needed yet, so nothing to grab: stock starts done.
      products.map((p) => [p.id, { need: 0, picked: 0, kitchen: notDone, stock: { done: true } }]),
    ),
    tasks: Object.fromEntries(tasks.map((t) => [t.id, notDone])),
  }
}

const initialState: AppState = { ...freshProgress(), settings: defaultSettings }

// Merge saved data over a fresh state so items added to the mock later still appear.
function load(): AppState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...initialState, settings: { ...defaultSettings, language: detectLanguage() } }
    const saved = JSON.parse(raw) as Partial<AppState>
    const fresh = freshProgress()
    const merge = <T,>(base: Record<number, T>, from?: Record<number, T>) =>
      Object.fromEntries(Object.entries(base).map(([id, v]) => [id, from?.[Number(id)] ?? v]))
    return {
      products: merge(fresh.products, saved.products),
      tasks: merge(fresh.tasks, saved.tasks),
      settings: {
        ...defaultSettings,
        ...saved.settings,
        language: isLanguage(saved.settings?.language) ? saved.settings.language : detectLanguage(),
      },
    }
  } catch {
    return initialState
  }
}

let state: AppState | null = null
const listeners = new Set<() => void>()

function getSnapshot(): AppState {
  if (!state) state = load()
  return state
}

const getServerSnapshot = (): AppState => initialState

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function setState(updater: (prev: AppState) => AppState, animate = false) {
  // State updates right away so fast taps during an animation are never lost;
  // only the re-render waits for the view transition.
  state = updater(getSnapshot())
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage full or blocked: state still lives in memory.
  }
  const notify = () => listeners.forEach((l) => l())

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (animate && !reduceMotion && document.startViewTransition) {
    document.startViewTransition(() => flushSync(notify))
  } else {
    notify()
  }
}

export function useAppState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/* ---------------- Actions ---------------- */

const moves = () => getSnapshot().settings.moveDoneToEnd

const markDone = (prev: IDoneState, done: boolean): IDoneState =>
  done ? (prev.done ? prev : { done: true, doneAt: Date.now() }) : notDone

/** Numbers only ever complete the stock item, when they land on picked === need (2/2…). They never reopen it. */
function withStockStatus(p: IProductProgress): IProductProgress {
  if (p.stock.done || p.picked !== p.need) return p
  return { ...p, stock: markDone(p.stock, true) }
}

function patchProduct(id: number, fn: (p: IProductProgress) => IProductProgress) {
  const before = getSnapshot().products[id]
  const after = fn(before)
  const statusChanged = before.kitchen.done !== after.kitchen.done || before.stock.done !== after.stock.done
  setState((prev) => ({ ...prev, products: { ...prev.products, [id]: after } }), moves() && statusChanged)
}

/**
 * Kitchen: how many have to be fetched. The one case where a number reopens the stock item:
 * going from "nothing to grab" (0) to something, otherwise it would already look done in stock.
 */
export function changeNeed(id: number, delta: number) {
  patchProduct(id, (p) => {
    const need = Math.max(0, p.need + delta)
    const stock = p.need === 0 && need > 0 ? notDone : p.stock
    return withStockStatus({ ...p, need, stock })
  })
}

/** Stock: how many were already picked. */
export function changePicked(id: number, delta: number) {
  patchProduct(id, (p) => withStockStatus({ ...p, picked: Math.max(0, p.picked + delta) }))
}

export function toggleProduct(list: MainLocationNames, id: number) {
  // The button only flips completion; numbers are left untouched.
  patchProduct(id, (p) => ({ ...p, [list]: markDone(p[list], !p[list].done) }))
}

export function toggleTask(id: number) {
  setState(
    (prev) => ({ ...prev, tasks: { ...prev.tasks, [id]: markDone(prev.tasks[id], !prev.tasks[id].done) } }),
    moves(),
  )
}

export function resetAll() {
  setState((prev) => ({ ...prev, ...freshProgress() }), true)
}

export function updateSettings(patch: Partial<ISettings>) {
  setState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }))
}

/* ---------------- Selectors / helpers ---------------- */

export function countOpen(s: AppState, list: MainLocationNames | 'tasks') {
  if (list === 'tasks') return Object.values(s.tasks).filter((t) => !t.done).length
  return Object.values(s.products).filter((p) => !p[list].done).length
}

/** Keeps the original order; when enabled, done items go to the end (oldest done first). */
export function orderItems<T extends { id: number }>(
  items: T[],
  status: (id: number) => IDoneState,
  moveDoneToEnd: boolean,
): T[] {
  if (!moveDoneToEnd) return items
  const open = items.filter((i) => !status(i.id).done)
  const done = items
    .filter((i) => status(i.id).done)
    .sort((a, b) => (status(a.id).doneAt ?? 0) - (status(b.id).doneAt ?? 0))
  return [...open, ...done]
}
