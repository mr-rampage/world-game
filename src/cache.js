self.addEventListener('install', event =>
  event.waitUntil(caches.open('world-game'))
);

self.addEventListener('fetch', event =>
  event.respondWith(caches.match(event.request).then(findResponse(caches, event.request))));

function cacheRequest(caches, request) {
  return fetch(request)
    .then(cacheResponse(caches, request));
}

function cacheResponse(caches, request) {
  return response => {
    const cloned = response.clone();
    caches.open('world-game')
      .then(cache => cache.put(request, cloned));
    return response;
  };
}

function findResponse(caches, request) {
  return response => response || cacheRequest(caches, request);
}
