export type LocationNames = 'kitchen' | 'stock'

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
  floor: LocationNames
}