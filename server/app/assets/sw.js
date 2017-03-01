const cacheName = 'codelab-2';

const filesToCache = [
  '/',
  '/script.js',
  '/js/localforage.js',
  '/css/main.css',
  '/css/exo-medium-webfont.woff',
  '/css/exo-medium-webfont.woff2',
  '/imgs/logo.svg',
  '/imgs/like.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (e) {
  /*if(e.request.url.endsWith('.jpg')){
      e.respondWith(fetch('/imgs/cat.gif'));
  }*/

  /*e.respondWith( new Response('<h1> Bonjour Devoxx </h1>', {
        headers: {'Content-Type': 'text/html'}
  }));*/

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
  } else {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  }
});