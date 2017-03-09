importScripts('/sw-toolbox.js');

toolbox.router.get('/**/*.jpg', toolbox.networkFirst);

/*
self.addEventListener('fetch', function (e) {
 
  if (e.request.url.endsWith('.jpg')) {
    e.respondWith(
      fetch(e.request)
        .then(function (response) {
          var copy = response.clone();
          caches.open(cacheName)
            .then(function (cache) {
              cache.put(e.request, copy);
            });
          return response;
        })
        .catch(function () {
          return caches.match(e.request)
            .then(function (response) {
              return response;
            })
        })
    );
  }
});*/

function sendLike(){
  return fetch('/like');
}

self.addEventListener('sync', function(event) {
  console.log(event)
  if (event.tag == 'like') {
    event.waitUntil(sendLike());
  }
});