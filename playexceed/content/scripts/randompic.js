let currentImage;
let sideNavImageArray = [
    '../content/images/sidebar/orie.png',
    '../content/images/sidebar/hazama.png',
    '../content/images/sidebar/platinum.png',
    '../content/images/sidebar/specter.png',
    '../content/images/sidebar/tinker.png',
    '../content/images/sidebar/shovel.png',]

let bannerImageArray = [
    'content/images/banners/bg1.jpg',
    'content/images/banners/bg2.jpg',
    'content/images/banners/bg3.jpg',
    'content/images/banners/bg4.jpg',
    'content/images/banners/bg5.jpg',
    'content/images/banners/bg6.jpg']


// dumbass. make these the same generic function using parameters.

function randomSideNavPic() {
    randomInt = Math.floor(Math.random() * sideNavImageArray.length);
    let currentImage = sideNavImageArray[randomInt];
    let sideNavImage = document.getElementById('BottomPic');

    sideNavImage.src = currentImage;
}

document.addEventListener("DOMContentLoaded", randomBanner())

function randomBanner() { //make this a psuedo element background instead so we can filter it
    randomInt = Math.floor(Math.random() * sideNavImageArray.length);
    let currentImage = bannerImageArray[randomInt];
    let bannerImage = document.getElementById('IndexHeading')
    let gradient = 'linear-gradient(to bottom right, rgba(250,163,69, 0.8), rgba(249,203,62, 0.8)), ';

    IndexHeading.style.backgroundImage = gradient + 'url(' + currentImage + ')';
}