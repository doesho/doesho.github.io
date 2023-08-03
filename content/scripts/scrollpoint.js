const scrollButton = document.getElementById('IndexHeadingBottom');
const scrollPoint = document.getElementById('scrollpoint');

scrollButton.addEventListener('click', scroll);

function scroll() {
    scrollPoint.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
    });
};