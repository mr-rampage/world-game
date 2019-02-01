self.addEventListener('install', event =>
  event.waitUntil(caches.open('world-game'))
);

self.addEventListener('fetch', event =>
  event.respondWith(caches.match(event.request).then(findResponse(caches, event.request))));

function findResponse(caches, request) {
  return response => response || cacheRequest(caches, request);
}

async function cacheRequest(caches, request) {
  const response = await fetch(request);
  const cloned = response.clone();
  const cache = await caches.open('world-game');
  cache.put(request, cloned);
  return response;
}
