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
    const selector1 = document.querySelector("#Selector1");
    const selector2 = document.querySelector("#Selector2");

    const characterChoices1 = selector1.querySelectorAll("[data-entry]");
    const characterChoices2 = selector2.querySelectorAll("[data-entry]");
    const InputPlayer1 = selector1.querySelector('data-searchInputContainer');
    const InputPlayer2 = selector2.querySelector('data-searchInputContainer');

    characterChoices1.forEach(choice => {
        choice.addEventListener("click", function () {
            const selectedCharacterLabel1 = this.querySelector(".CharacterLabel").textContent;
            const charIconSrc = this.querySelector(".CharIcon").getAttribute("src");
            const selectedCharacterLabel2 = document.querySelector("#Selector2 .SelectorOpener").textContent.trim();

            closeCharacterSelector(this.closest(".CharacterSelector"));

            const opener1 = this.closest(".SelectorContainer").querySelector(".SelectorOpener");
            opener1.innerHTML = `<img src="${charIconSrc}" class="CharIcon" /> ${selectedCharacterLabel1}`;
            opener1.classList.add("selected");

            //adjustPlayerOrder(selectedCharacterLabel1, selectedCharacterLabel2);
        });
    });

    characterChoices2.forEach(choice => {
        choice.addEventListener("click", function () {
            const selectedCharacterLabel2 = this.querySelector(".CharacterLabel").textContent;
            const charIconSrc = this.querySelector(".CharIcon").getAttribute("src");
            const selectedCharacterLabel1 = document.querySelector("#Selector1 .SelectorOpener").textContent.trim();

            closeCharacterSelector(this.closest(".CharacterSelector"));

            const opener2 = this.closest(".SelectorContainer").querySelector(".SelectorOpener");
            opener2.innerHTML = `<img src="${charIconSrc}" class="CharIcon" /> ${selectedCharacterLabel2}`;
            opener2.classList.add("selected");

            //adjustPlayerOrder(selectedCharacterLabel1, selectedCharacterLabel2);
        });
    });
});

// generic "close the selectors" function

function closeCharacterSelector(container) {
    container.style.display = 'none';
    //call clearInputField... somehow
}

// - FILTER CHOICES - BUTTON
//blah

const searchButton = document.getElementById("SearchButton");

searchButton.addEventListener("click", function () {
    const buddyID = this.getAttribute('data-searchbuddy-id');
    const parentEntryContainer = document.querySelectorAll(`[data-parentEntryContainer][data-searchbuddy-id="${buddyID}"]`);

    const searchBar = document.getElementById("SearchBar");

    const inputCharacter1 = searchBar.querySelector('[data-searchInputContainer="characterSearch1"]').textContent.trim();
    const inputCharacter2 = searchBar.querySelector('[data-searchInputContainer="characterSearch2"]').textContent.trim();
    const inputPlayer1 = searchBar.querySelector('[data-searchInputContainer="playerSearch1"] input').value.trim().toLowerCase();
    const inputPlayer2 = searchBar.querySelector('[data-searchInputContainer="playerSearch2"] input').value.trim().toLowerCase();
    const inputDescription = searchBar.querySelector('[data-searchInputContainer="descriptionSearch"] input').value;

    filterReplayEntries(parentEntryContainer, inputPlayer1, inputCharacter1, inputPlayer2, inputCharacter2, inputDescription);
})

// - FILTER CHOICES - FUNCTION
//blah

function filterReplayEntries(pEntryContainer, pInputPlayer1, pInputCharacter1, pInputPlayer2, pInputCharacter2, pInputDescription) {

    const blankInput = ["Any Character", ""];

    pEntryContainer.forEach(container => {

        const entries = container.querySelectorAll("[data-entry]")

        //bypass if fields blank
        if (blankInput.includes(pInputPlayer1) && blankInput.includes(pInputPlayer2) &&
            blankInput.includes(pInputCharacter1) && blankInput.includes(pInputCharacter2))
        {
            entries.forEach(entry => {
                eEntryDisplayType = entry.getAttribute('[data-entry]');
                entry.style.display = eEntryDisplayType;
            })
            return;
        };

        entries.forEach(entry => {

            let matchFound1 = false;
            let matchFound2 = false;
            const playerDivs = entry.querySelectorAll('[data-tags="playerDiv"]');
            eEntryDisplayType = entry.getAttribute('[data-entry]');

            var ePlayerNames = Array.from(playerDivs)
                .flatMap(playerDiv => Array.from(playerDiv.querySelectorAll('[data-tags="playerName"]')))
                .map(playerNameElement => playerNameElement.textContent.trim().toLowerCase());

            var eCharacterNames = Array.from(playerDivs)
                .flatMap(playerDiv => Array.from(playerDiv.querySelectorAll('[data-tags="characterName"]')))
                .map(characterNameElement => characterNameElement.textContent);

            function adjustOrder() {
                //check if characters should swap
                if ((eCharacterNames[0] === pInputCharacter2 || blankInput.includes(pInputCharacter2)) && ((eCharacterNames[1] === pInputCharacter1) || blankInput.includes(pInputCharacter1))) {

                    //check if players should swap
                    if ((ePlayerNames[0] === pInputPlayer2 || blankInput.includes(pInputPlayer2)) && ((ePlayerNames[1] === pInputPlayer1) || blankInput.includes(pInputPlayer1))) {
                        const parent = playerDivs[0].parentNode;
                        const vs = entry.querySelector('[data-vs]');

                        parent.insertBefore(playerDivs[1], playerDivs[0]);
                        parent.insertBefore(vs, playerDivs[0]);
                        alert(`${eCharacterNames[0]} and ${eCharacterNames[1]} swapped!`);
                        return true;
                    }
                };
                return false;
            }

            const titlesSwapped = adjustOrder()
            if (titlesSwapped) {
                entry.style.display = eEntryDisplayType;
                return;
            }

            if (ePlayerNames[0].includes(pInputPlayer1) && ((eCharacterNames[0] == pInputCharacter1) || (blankInput.includes(pInputCharacter1)))) {
                matchFound1 = true;
            }

            if (ePlayerNames[1].includes(pInputPlayer2) && ((eCharacterNames[1] == pInputCharacter2) || (blankInput.includes(pInputCharacter2)))) {
                matchFound2 = true;
            }

            if (matchFound1 && matchFound2) {
                entry.style.display = eEntryDisplayType;
                console.log("found!");
            } else {
                entry.style.display = "none";
                console.log("nope");
            }

            });

    })

    alert("SEARCH DONE!");
}


// - ADJUST PLAYER ORDER
//This bitch's days are numbered. We're replacing her with a sexier adjustOrder which works in each loop instead of doing its own thing.
function adjustPlayerOrder(pInputCharacter1, pInputCharacter2) {
    const choices = document.querySelectorAll(".Choice");

    choices.forEach(choice => {
        const characterLabels = Array.from(choice.querySelectorAll(".CharacterLabel"));
        const player1 = choice.querySelector(".Player:first-child");
        const player2 = choice.querySelector(".Player:last-child");
        const parent = player1.parentNode;
        const vs = choice.querySelector(".vs");

        const label1 = characterLabels[0].textContent.trim();
        const label2 = characterLabels[1].textContent.trim();

        if (label1 === pInputCharacter1 && label2 === pInputCharacter2) { //if both sides match each other, return
            return;
        }

        if ((label1 === pInputCharacter2 && label2 === pInputCharacter1) || //if (entry1 = input2 AND entry2 = input 2) OR
            (pInputCharacter1 === "Any Character" && label1 === pInputCharacter2) || //(input1 is any AND entry1 is input2 ) OR
            (label2 === pInputCharacter1 && pInputCharacter2 === "Any Character")) { //(entry2 is input1 AND input2 is any)

            parent.insertBefore(player2, player1);
            parent.insertBefore(vs, player1);
        }
    })
}

// - ADJUST ORDER
 //replace adjustplayerorder and be called in the search thing so we dont iterate every choice twice.
 //this should adjust entries before the rest of the filter checks it so we do it all in the same entry.foreach loop



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