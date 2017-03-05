window.onload = function() {
    toLike();

    let promise;
        
    if(!navigator.onLine) {
        document.querySelector('#wrapper').classList.add('off');
        promise = localforage.getItem('data');
    } else {
        promise = fetch('/articles')
                .then(result => result.json());
    }

    
    promise.then(data => {
        displayData(data);
        return data;
    })
    .then(data => localforage.setItem('data', data))

    window.addEventListener("offline", function () {
        document.querySelector('#wrapper').classList.add('off');
    }, false);
    window.addEventListener("online", function () {
        document.querySelector('#wrapper').classList.remove('off');
    }, false);
    
    if ('serviceWorker' in navigator) {
		navigator.serviceWorker
		.register('./sw.js')
                .then(registration => navigator.serviceWorker.ready)
                .then(registration => { // register sync
                    document.querySelectorAll('.icon-like').forEach(el => {
                        el.addEventListener('click', function() {
                            this.classList.toggle('active');
                            registration.sync.register('like').then(() => {
                                console.log('Sync registered');
                            });    
                        });
                    });
                })
		.then(function() { console.log('Service Worker Registered'); });
	}
};

function displayData(data) {
    let highlight = document.querySelector('.highlight');
    highlight.querySelector('h2 a').innerHTML = data.highlight.title;
    highlight.querySelector('img').src = data.highlight.picture;
    highlight.querySelector('.description').innerHTML = data.highlight.description;
    highlight.querySelector('.info li:first-child').innerHTML = data.highlight.date;
    highlight.querySelector('.info li:nth-child(2)').innerHTML = `${data.highlight.like} j'aime`;

    if(data.highlight.ilike){
        highlight.querySelector('.icon-like').classList.add('active');  
    }

    data.entries.forEach((entry, i) => {
        let e = document.querySelector(`.entry:nth-child(${i + 1})`)
        e.querySelector('h2').innerHTML = entry.title;
        e.querySelector('img').src = entry.picture;
        e.querySelector('.content p').innerHTML = entry.content;
    
    });

}
