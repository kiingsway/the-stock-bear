export function loadLS(key: string): Record<number, number> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    return {}
  }
}

export function saveLS(key: string, val: Record<number, number>) {
  localStorage.setItem(key, JSON.stringify(val))
}