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
  }
});

function sendLike(){
  return fetch('/like');
}

self.addEventListener('sync', function(event) {
  console.log(event)
  if (event.tag == 'like') {
    event.waitUntil(sendLike());
  }
});