// service-worker.js — simple cache-first service worker
const CACHE_NAME = 'little-learners-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/Letters.html',
  '/css/styles.css',
  '/js/app.js',
  '/manifest.json',
  '/assets/fonts/funster.otf'
  // add '/assets/letters/A.png', ... if you intend to cache letter PNGs
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)
    ))
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // for navigation, prefer network then fallback to cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
    return;
  }
  // cache-first for other assets
  e.respondWith(
    caches.match(req).then(res => res || fetch(req).then(fetchRes => {
      // optionally cache fetched assets
      return fetchRes;
    }).catch(() => null))
  );
});