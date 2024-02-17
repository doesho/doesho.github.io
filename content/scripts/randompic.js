let currentImage;
let sideNavImageArray = [
    '../content/images/sidebar/bridget.png',
    '../content/images/sidebar/ky.png',
    '../content/images/sidebar/sol.png',
    '../content/images/sidebar/ramlethal.png',
    '../content/images/sidebar/orie.png',
    '../content/images/sidebar/enkidu.png',
    '../content/images/sidebar/hazama.png',
    '../content/images/sidebar/platinum.png',
    '../content/images/sidebar/specter.png',
    '../content/images/sidebar/tinker.png',
    '../content/images/sidebar/washington.png',
    '../content/images/sidebar/shovel.png']

let bannerImageArray = [
    'content/images/banners/wave1/bg1.jpg',
    'content/images/banners/wave1/bg2.jpg',
    'content/images/banners/wave1/bg3.jpg',
    'content/images/banners/wave1/bg4.jpg',
    'content/images/banners/wave1/bg5.jpg',
    'content/images/banners/wave1/bg6.jpg']


// dumbass. make these the same generic function using parameters.

document.addEventListener('DOMContentLoaded', randomSideNavPic);

let previousrandomInt = 0;

function randomSideNavPic() { //applies a random sidenav pic each time the sidenav is closed (for load times)
    randomInt = Math.floor(Math.random() * sideNavImageArray.length);
    if (randomInt === previousrandomInt) {
        randomInt++;
    }
    let currentImage = sideNavImageArray[randomInt];
    let sideNavImage = document.getElementById('BottomPic');

    sideNavImage.src = currentImage;

    previousrandomInt = randomInt;
}

document.addEventListener('DOMContentLoaded', randomBanner);

let newimage = document.getElementById('newImage');
newimage.addEventListener('click', randomBanner);

function randomBanner() { //make this a psuedo element background instead so we can work with it better
    randomInt = Math.floor(Math.random() * bannerImageArray.length);
    //if (randomInt === previousrandomInt) {
    //    randomInt++;
    //}
    let currentImage = bannerImageArray[randomInt];
    let gradient = 'linear-gradient(to bottom right, var(--gradient1), var(--gradient2)), ';

    IndexHeading.style.backgroundImage = gradient + 'url(' + currentImage + ')';

    previousrandomInt = randomInt; //stores int for comparison in the next loop
    //setTimeout(randomBanner, 2000);
}