const cacheName = 'codelab-7';

const filesToCache = [
  '/',
  '/script.js',
  '/css/main.css',
  '/css/exo-medium-webfont.woff',
  '/css/exo-medium-webfont.woff2',
  '/imgs/logo.svg',
  '/imgs/like.svg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  /*if(e.request.url.endsWith('.jpg')){
      e.respondWith(fetch('/imgs/cat.gif'));
  }*/

  /*e.respondWith( new Response('<h1> Bonjour Devoxx </h1>', {
        headers: {'Content-Type': 'text/html'}
  }));*/
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('sync', function(event) {
  console.log(event)
  if (event.tag == 'like') {
    event.waitUntil(sendLike());
  }
});

function sendLike(){
  return fetch('/like')
}