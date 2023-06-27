//core search functionality

function funcSearch(input) {
    let choiceContainer = document.getElementById("ChoiceUniqueContainer");
    let filter = input.target.value.toUpperCase();
    let choices = choiceContainer.querySelectorAll("div.Choice");

    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i];
        let content = choice.innerText.toUpperCase();

        if (content.includes(filter)) {
            choice.style.display = "";
        } else {
            choice.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let input = document.getElementById("SearchInput");
    input.addEventListener("input", funcSearch);
});