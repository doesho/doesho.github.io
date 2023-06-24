//core search functionality. change style of matches?

function funcSearch(input) {
    let choiceContainer = document.getElementById("ChoiceUniqueContainer");
    let filter = input.target.value.toUpperCase();
    let links = choiceContainer.querySelectorAll("a.ChoiceLink");

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

//sticky functionality. rewrite to search for all class "canstick" elements?

let searchbar = document.getElementById("SearchBar");
let stickpoint = searchbar.offsetTop;

window.onscroll = function () { funcSticky() };

function funcSticky() {
    if (window.pageYOffset > (stickpoint + 20)) {
        searchbar.classList.add("sticky");
    } else {
        searchbar.classList.remove("sticky");
    }
}