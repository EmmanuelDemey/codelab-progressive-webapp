window.onload = function() {
    toLike();

    fetch('/articles')
        .then(result => result.json())
        .then(data => displayData(data));


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

function toLike() {
    const zLike = document.querySelectorAll('.icon-like');

    zLike.forEach(el => {
        el.addEventListener('click', function() {
            fetch('/like').then(() => {
                    this.classList.toggle('active');
                });
        });
    });
}

