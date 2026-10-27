import { locations as rawLocations } from './locations'
import { products as rawProducts } from './products'
import { tasks as rawTasks } from './tasks'

// Lists are always shown in id order, regardless of how the files are written.
const byId = <T extends { id: number }>(items: T[]) => [...items].sort((a, b) => a.id - b.id)

export const locations = byId(rawLocations)
export const products = byId(rawProducts)
export const tasks = byId(rawTasks)
