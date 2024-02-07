//make div visible when opener clicked

const selectorOpeners = document.querySelectorAll(".SelectorOpener");
const selectorContainer = document.querySelectorAll(".SelectorContainer");

selectorOpeners.forEach(opener => {
    opener.addEventListener("click", function () {
        const parentContainer = this.closest('.SelectorContainer');
        const characterSelector = parentContainer.querySelector('.CharacterSelector');

        // Toggle visibility
        if (characterSelector.style.display === 'none' || characterSelector.style.display === '') {
            characterSelector.style.display = 'flex';
        } else {
            characterSelector.style.display = 'none';
        }
    });
});

// -- UPDATE OPENER APPEARANCE
//This section grabs Selectors and adds listeners to the buttons. It then calls filterChoices and updates
//Opener appearance. Finally it calls adjustPlayerOrder to swap Player divs in the Choice if applicable.
//TO DO - make this a called function and put the establishments elsewhere.

document.addEventListener("DOMContentLoaded", function () {
    const characterChoices1 = document.querySelectorAll("#Selector1 .CharacterChoice");
    const characterChoices2 = document.querySelectorAll("#Selector2 .CharacterChoice");

    characterChoices1.forEach(choice => {
        choice.addEventListener("click", function () {
            const selectedCharacterLabel1 = this.querySelector(".CharacterLabel").textContent;
            const charIconSrc = this.querySelector(".CharIcon").getAttribute("src");
            const selectedCharacterLabel2 = document.querySelector("#Selector2 .SelectorOpener").textContent.trim();

            closeCharacterSelector(this.closest(".CharacterSelector"));
            filterChoices(selectedCharacterLabel1, selectedCharacterLabel2);

            // Update SelectorOpener content and styling
            const opener1 = this.closest(".SelectorContainer").querySelector(".SelectorOpener");
            opener1.innerHTML = `<img src="${charIconSrc}" class="CharIcon" /> ${selectedCharacterLabel1}`;
            opener1.classList.add("selected");

            adjustPlayerOrder(selectedCharacterLabel1, selectedCharacterLabel2);
        });
    });

    characterChoices2.forEach(choice => {
        choice.addEventListener("click", function () {
            const selectedCharacterLabel2 = this.querySelector(".CharacterLabel").textContent;
            const charIconSrc = this.querySelector(".CharIcon").getAttribute("src");
            const selectedCharacterLabel1 = document.querySelector("#Selector1 .SelectorOpener").textContent.trim();

            closeCharacterSelector(this.closest(".CharacterSelector"));
            filterChoices(selectedCharacterLabel1, selectedCharacterLabel2);

            // Update SelectorOpener content and styling
            const opener2 = this.closest(".SelectorContainer").querySelector(".SelectorOpener");
            opener2.innerHTML = `<img src="${charIconSrc}" class="CharIcon" /> ${selectedCharacterLabel2}`;
            opener2.classList.add("selected");

            adjustPlayerOrder(selectedCharacterLabel1, selectedCharacterLabel2);
        });
    });
});

// generic "close the selectors" function

function closeCharacterSelector(container) {
    container.style.display = 'none';
    //call clearInputField... somehow
}

// - FILTER CHOICES - GENERIC ME
//This function takes the selected CharacterLabels from the Selectors and iterates over each Choice, comparing against a bool
//and hiding or showing the choice based on result

function filterChoices(selectedCharacterLabel1, selectedCharacterLabel2) {
    const choices = document.querySelectorAll(".Choice");

    choices.forEach(choice => {
        const characterLabels = choice.querySelectorAll(".CharacterLabel");
        let matchFound1 = false;
        let matchFound2 = false;

        characterLabels.forEach(label => {
            const choiceCharacterLabel = label.textContent.trim();

            if (selectedCharacterLabel1 === "Any Character" || choiceCharacterLabel === selectedCharacterLabel1) {
                matchFound1 = true;
            }
            if (selectedCharacterLabel2 === "Any Character" || choiceCharacterLabel === selectedCharacterLabel2) {
                matchFound2 = true;
            }
        });

        if (matchFound1 && matchFound2) {
            choice.style.display = "inline-block";
        } else {
            choice.style.display = "none";
        }
    });
}

// - ADJUST PLAYER ORDER
//This function receives the selected CharacterLabels from the Selectors and loops through each choice, comparing the received
//CharacterLabels against each choice's CharacterLabels (held within ChoiceTitle). If they match but are criss-crossed we swap
//the choice labels around to reflect the order the CharacterLabels are in. Otherwise, return or end naturally.

function adjustPlayerOrder(selectedCharacterLabel1, selectedCharacterLabel2) {
    const choices = document.querySelectorAll(".Choice");

    choices.forEach(choice => {
        const characterLabels = Array.from(choice.querySelectorAll(".CharacterLabel"));
        const player1 = choice.querySelector(".Player:first-child");
        const player2 = choice.querySelector(".Player:last-child");
        const parent = player1.parentNode;
        const vs = choice.querySelector(".vs");

        if (player1 && player2) {
            const label1 = characterLabels[0].textContent.trim();
            const label2 = characterLabels[1].textContent.trim();

            if (label1 === selectedCharacterLabel1 && label2 === selectedCharacterLabel2) {
                return;
            }

            if ((label1 === selectedCharacterLabel2 && label2 === selectedCharacterLabel1) ||
                (selectedCharacterLabel1 === "Any Character" && label1 === selectedCharacterLabel2) ||
                (label2 === selectedCharacterLabel1 && selectedCharacterLabel2 === "Any Character")) {

                parent.insertBefore(player2, player1);
                parent.insertBefore(vs, player1);
            }
        }
    })
}

// - TOGGLE WINNER ICON

function toggleWinnerIcon() {
    var winnerIcon = document.querySelectorAll(".WinnerIcon");
    var spoilerCheckbox = document.getElementById("SpoilerCheckbox");

    winnerIcon.forEach(icon => {
        if (spoilerCheckbox.checked == false) {
            icon.style.visibility = "hidden";
        } else {
            icon.style.visibility = "visible";
        }
    });
};