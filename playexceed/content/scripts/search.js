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