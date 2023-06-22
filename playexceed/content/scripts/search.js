//core search functionality

function funcSearch(input) {
    let filter = input.target.value.toUpperCase();
    let links = document.querySelectorAll("a.ChoiceLink");

    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        let content = link.innerText.toUpperCase();

        if (content.includes(filter)) {
            link.style.display = "";
        } else {
            link.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let input = document.getElementById("SearchInput");
    input.addEventListener("input", funcSearch);
});

//sticky functionality. it is returning searchbar as undefined.

let searchbar = document.getElementsByClassName("SearchBar");
let stickpoint = 100;

window.onscroll = function () { funcSticky() };

function funcSticky() {
    if (window.pageYOffset > stickpoint) {
        searchbar.classList.add("sticky");
    } else {
        searchbar.classList.remove("sticky");
    }
}