self.addEventListener('fetch', function(e) {
   
  if(e.request.url.endsWith('.jpg')){
      e.respondWith(fetch('/imgs/cat.gif'));
  }

  /*e.respondWith( new Response('<h1> Bonjour Devoxx </h1>', {
        headers: {'Content-Type': 'text/html'}
  }));*/
});

