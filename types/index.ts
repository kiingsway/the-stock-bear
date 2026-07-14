export type Modes = 'kitchen' | 'stock' | 'tasks'

export type MainLocationNames = 'kitchen' | 'stock'

export interface IProduct {
  id: number
  name: string;
  par: number;
  kLocationId: number
  sLocationId: number
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