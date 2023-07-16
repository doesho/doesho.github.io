//sticky functionality, should perform on all class=stickable.

let stickables = document.getElementsByClassName("stickable");

for (let i = 0; i < stickables.length; i++) {
    let stickable = stickables[i];
    let stickpoint = stickable.offsetTop;

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > (stickpoint)) {
            stickable.classList.add("sticky");
        } else {
            stickable.classList.remove("sticky");
        }
    })
};