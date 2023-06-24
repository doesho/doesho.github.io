const opener = document.getElementById("SideNavOpener");
const sideNavDiv = document.getElementById("SideNav");
const closer = document.getElementById("SideNavCloser");

let currentImage;
let imageArray = [
    '../content/images/sidebar/orie.png',
    '../content/images/sidebar/hazama.png',
    '../content/images/sidebar/platinum.png',
    '../content/images/sidebar/specter.png',
    '../content/images/sidebar/tinker.png',
    '../content/images/sidebar/shovel.png',

]

opener.addEventListener("click", openSideNav);
document.addEventListener("click", closeSideNav);

function openSideNav() { //width set auto, becomes child width (sideNavcontents in sideNavstyle.css)
    sideNavDiv.style.width = "auto";
    sideNavDiv.style.borderRight = "1px solid gray";
    randomSideNavPic();
    event.stopPropagation();
}

function closeSideNav() {
    if (!sideNavDiv.contains(event.target) || closer.contains(event.target)) {
        sideNavDiv.style.width = "";
        sideNavDiv.style.borderRight = "";
    }
}

//retrieve random image when sidebar is opened

function randomSideNavPic() {
    randomInt = Math.floor(Math.random() * imageArray.length);
    let currentImage = imageArray[randomInt];
    let sideNavImage = document.getElementById('BottomPic');

    sideNavImage.src = currentImage;
}