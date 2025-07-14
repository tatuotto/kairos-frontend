const CACHE_NAME = 'kairos-cache-v2'; // Incrementamos la versión para forzar la actualización
const urlsToCache = [
  '/kairos-frontend/',
  '/kairos-frontend/index.html',
  '/kairos-frontend/manifest.json',
  '/kairos-frontend/icons/icon-192x192.png',
  '/kairos-frontend/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Cache abierto, guardando archivos de la app.');
        return cache.addAll(urlsToCache);
      })
  );
});

// Limpieza de cachés viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
