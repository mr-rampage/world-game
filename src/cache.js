self.addEventListener('fetch', event =>
  event.respondWith(caches.open('world-game').then(findResponse(event.request))));

function cacheRequest(cache, request) {
  return fetch(request)
    .then(cacheResponse.bind(null, cache, request));
}

function cacheResponse(cache, request, response) {
  cache.put(request, response.clone());
  return response;
}

function findResponse(request) {
  return cache => cache
    .match(request)
    .then(response => response || cacheRequest(cache, request));
}
