window.onload = function() {
    toLike();
};

function toLike() {
    const zLike = document.querySelectorAll('.icon-like');

    zLike.forEach(el => {
        el.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}