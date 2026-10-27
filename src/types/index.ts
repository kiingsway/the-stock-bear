export type MainLocationNames = 'kitchen' | 'stock'

export interface IProduct {
  id: number
  name: string
  par: number // Quantity that has to be fetched
  locationsId: Record<MainLocationNames, number> // ILocation.id telling where each product is
}

export interface ILocation {
  id: number
  title: string
  floor: MainLocationNames
}

export interface ITask {
  id: number
  name: string
  desc?: string
  locationId?: number
}

/* ---- Client-side state (not part of the server contract) ---- */

export type ListName = MainLocationNames | 'tasks'

export interface IDoneState {
  done: boolean
  doneAt?: number
}

/** Shared between Kitchen and Stock: kitchen sets `need`, stock counts `picked`. */
export interface IProductProgress {
  need: number
  picked: number
  kitchen: IDoneState
  stock: IDoneState
}

export type Hand = 'left' | 'right'

export type Language = 'en' | 'pt' | 'fr' | 'es' | 'ko'

export interface ISettings {
  moveDoneToEnd: boolean
  hand: Hand
  language: Language
}
