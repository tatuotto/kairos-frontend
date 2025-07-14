// Este es el nombre de nuestra "caja" de archivos guardados.
const CACHE_NAME = 'kairos-cache-v1';
// Esta es la lista de archivos fundamentales de la app que queremos guardar.
const urlsToCache = [
  '/',
  '/kairos-frontend/',
  '/kairos-frontend/index.html',
  '/kairos-frontend/manifest.json',
  '/kairos-frontend/icons/icon-192x192.png',
  '/kairos-frontend/icons/icon-512x512.png'
];

// Cuando la app se instala por primera vez, se ejecuta esto.
self.addEventListener('install', event => {
  // Le decimos que espere hasta que la caja (caché) esté abierta y llena.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Abriendo caché y guardando archivos de la app');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cada vez que la app pide algo (una imagen, un archivo), este evento se dispara.
self.addEventListener('fetch', event => {
  event.respondWith(
    // Busca el archivo primero en nuestra caja de guardados (caché).
    caches.match(event.request)
      .then(response => {
        // Si lo encuentra, lo devuelve al toque. Si no, lo busca en internet.
        // Esto es lo que hace que funcione offline.
        return response || fetch(event.request);
      })
  );
});
