const CACHE_NAME = 'japanese-flashcards-v2.2.0';
const urlsToCache = [
  './',
  './index.html',
  './css/main.css',
  './css/components.css',
  './js/navigation.js',
  './js/app-core.js',
  './js/data.js',
  './js/vocabulary.js',
  './js/shared-user.js',
  './js/pull-to-refresh.js',
  './js/vocabulary-ui.js',
  './js/vocabulary-practice.js',
  './js/firebase-modern.js',
  './js/storage.js',
  './js/progress.js',
  './js/srs.js',
  './js/practice.js',
  './manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('All resources cached');
        return self.skipWaiting(); // Force waiting service worker to become active
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...', CACHE_NAME);
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log('Existing caches:', cacheNames);
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated, claiming clients');
      return self.clients.claim(); // Take control of all pages immediately
    })
  );
});
