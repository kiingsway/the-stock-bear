// The Stock Bear 2 — service worker.
// Pages and data: network first (fresh when online, cached page when offline).
// Static assets: cache first (Next hashes their file names).

const CACHE = 'tsb2-v1'
const PRECACHE = ['/', '/icon.svg', '/icon-192.png', '/icon-512.png', '/manifest.webmanifest']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  const { pathname } = new URL(request.url)
  const isStatic = pathname.startsWith('/_next/static/') || /\.(png|svg|ico|woff2?)$/.test(pathname)

  if (!isStatic) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok && request.mode === 'navigate') {
            const copy = res.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return res
        })
        .catch(() =>
          caches.match(request).then((hit) => hit || (request.mode === 'navigate' ? caches.match('/') : undefined)),
        ),
    )
    return
  }

  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return res
        }),
    ),
  )
})
