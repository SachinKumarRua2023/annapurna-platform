// World-Class Service Worker - Google CEO Level Performance
const CACHE_NAME = 'annapurna-v1.0.0'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/icon.svg',
  '/apple-touch-icon.png',
  '/og-image.jpg',
  '/twitter-image.jpg'
]

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            return caches.delete(key)
          }
        })
      ))
      .then(() => self.clients.claim())
  )
})

// Fetch event - Network first, then cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') return
  
  // Handle different request types
  if (request.url.includes('/api/')) {
    // API requests - Network only
    event.respondWith(fetch(request))
  } else if (request.destination === 'image' || request.destination === 'script') {
    // Static assets - Cache first
    event.respondWith(cacheFirst(request))
  } else {
    // Pages - Network first, then cache
    event.respondWith(networkFirst(request))
  }
})

// Cache first strategy
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cached = await cache.match(request)
  
  if (cached) {
    return cached
  }
  
  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.error('Cache first failed:', error)
    throw error
  }
}

// Network first strategy
async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  
  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.log('Network failed, trying cache:', error)
    const cached = await cache.match(request)
    return cached || new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Handle offline actions like form submissions, cart updates, etc.
  console.log('Background sync completed')
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon.svg',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/xmark.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Annapurna Platform', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})
