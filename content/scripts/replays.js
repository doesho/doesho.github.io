document.addEventListener("DOMContentLoaded", function () {
    
})

// -- OPEN SELECTORS, CLOSE SELECTORS

const characterSelector1 = document.querySelector('[data-characterSelector="1"]');
const characterSelector2 = document.querySelector('[data-characterSelector="2"]');
const selectorOpener1 = document.querySelector('[data-searchInputContainer="characterSearch1"]');
const selectorOpener2 = document.querySelector('[data-searchInputContainer="characterSearch2"]');

let winnerVisible = true;

document.addEventListener("click", function () {

    if (selectorOpener1.contains(event.target) || selectorOpener2.contains(event.target)) {
        const parentContainer = event.target.closest('.SelectorContainer');
        const characterSelector = parentContainer.querySelector('.CharacterSelector');

        if (characterSelector.style.display === 'none' || characterSelector.style.display === '') {
            characterSelector.style.display = 'flex';
        } else {
            characterSelector.style.display = 'none';
        }
    } else if (characterSelector1.contains(event.target) || characterSelector2.contains(event.target)) {
        return;
    } else {
        const characterSelectors = document.querySelectorAll('.CharacterSelector');
        characterSelectors.forEach(selector => {
            selector.style.display = "none"
        })
    }

})

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

            this.closest(".CharacterSelector").style.display = "none";

            selectorOpener1.innerHTML = `<img src="${charIconSrc}" class="CharIcon" /> ${selectedCharacterLabel1}`;
            selectorOpener1.classList.add("selected");

        });
    });

    characterChoices2.forEach(choice => {
        choice.addEventListener("click", function () {
            const selectedCharacterLabel2 = this.querySelector(".CharacterLabel").textContent;
            const charIconSrc = this.querySelector(".CharIcon").getAttribute("src");
            const selectedCharacterLabel1 = document.querySelector("#Selector1 .SelectorOpener").textContent.trim();

            this.closest(".CharacterSelector").style.display = "none";

            selectorOpener2.innerHTML = `<img src="${charIconSrc}" class="CharIcon" /> ${selectedCharacterLabel2}`;
            selectorOpener2.classList.add("selected");

        });
    });
});

// - FILTER CHOICES - BUTTON
//clicking the search button passes the input information from the character and player fields into the filter choices
//function.
const searchButton = document.getElementById("SearchButton");

searchButton.addEventListener("click", function () {
    const buddyID = this.getAttribute('data-searchbuddy-id');
    const parentEntryContainer = document.querySelectorAll(`[data-parentEntryContainer][data-searchbuddy-id="${buddyID}"]`);

    const searchBar = document.getElementById("SearchBar");

    const inputCharacter1 = selectorOpener1.textContent.trim();
    const inputCharacter2 = selectorOpener2.textContent.trim();
    const inputPlayer1 = searchBar.querySelector('[data-searchInputContainer="playerSearch1"] input').value.trim().toLowerCase();
    const inputPlayer2 = searchBar.querySelector('[data-searchInputContainer="playerSearch2"] input').value.trim().toLowerCase();
    const inputDescription = searchBar.querySelector('[data-searchInputContainer="descriptionSearch"] input').value;
    const winnerVisible = document.getElementById("SpoilerCheckbox").checked;
    document.documentElement.scrollTop = 0;

    filterReplayEntries(parentEntryContainer, inputPlayer1, inputCharacter1, inputPlayer2, inputCharacter2, inputDescription, winnerVisible);
})

// - FILTER CHOICES - FUNCTION
//blah

function filterReplayEntries(pEntryContainer, pInputPlayer1, pInputCharacter1, pInputPlayer2, pInputCharacter2, pInputDescription, pWinnerVisible) {

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
            let playerDivs = entry.querySelectorAll('[data-tags="playerDiv"]');
            eEntryDisplayType = entry.getAttribute('[data-entry]');
            const characterImgArray = [];
            const winnerArray = [];

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
                    if ((ePlayerNames[0].includes(pInputPlayer2) || blankInput.includes(pInputPlayer2)) && ((ePlayerNames[1].includes(pInputPlayer1)) || blankInput.includes(pInputPlayer1))) {
                        const parent = playerDivs[0].parentNode;
                        const vs = entry.querySelector('[data-vs]');

                        parent.insertBefore(playerDivs[1], playerDivs[0]);
                        parent.insertBefore(vs, playerDivs[0]);
                        playerDivs = entry.querySelectorAll('[data-tags="playerDiv"]'); //update this array
                        return true;
                    }
                };
                return false;
            }

            const orderAdjusted = adjustOrder();

            playerDivs.forEach(player => {
                const characterImg = player.querySelector("img");
                characterImgArray.push(characterImg);

                const winner = player.querySelector(".WinnerIcon");
                if (winner && pWinnerVisible) {
                    winnerArray.push("win");
                } else {
                    winnerArray.push("lose");
                }
            })

            if (orderAdjusted) {
                entry.style.display = eEntryDisplayType;
                updateBackgroundArt(entry, characterImgArray[0], characterImgArray[1], winnerArray);
                return;
            }

            if (ePlayerNames[0].includes(pInputPlayer1) && ((eCharacterNames[0] == pInputCharacter1) || (blankInput.includes(pInputCharacter1)))) {
                matchFound1 = true;
            }

            if (ePlayerNames[1].includes(pInputPlayer2) && ((eCharacterNames[1] == pInputCharacter2) || (blankInput.includes(pInputCharacter2)))) {
                matchFound2 = true;
            }

            if (matchFound1 && matchFound2) {
                updateBackgroundArt(entry, characterImgArray[0], characterImgArray[1], winnerArray);
                entry.style.display = eEntryDisplayType;
            } else {
                entry.style.display = "none";
            }

            });

    })
}

// - TOGGLE WINNER ICON

function toggleWinnerIcon() {
    var winnerIcon = document.querySelectorAll(".WinnerIcon");

    winnerIcon.forEach(icon => {
        if (spoilerCheckbox.checked == false) {
            winnerVisible = false;
            icon.style.visibility = "hidden";
        } else {
            winnerVisible = true;
            icon.style.visibility = "visible";
        }
    });
};

// -- BACKGROUND IMAGE ON LINES

function updateBackgroundArt(pEntry, pCharacter1, pCharacter2, pWinnerArray) {
    //char1 will always be left and char2 always right (the swap function feeds them in visually proper order)
    console.log(pWinnerArray);

    if ((pWinnerArray[0] === "lose") && (pWinnerArray[1] === "lose")) {
        pEntry.style.background = `linear-gradient(to right, transparent 10%, var(--secondary) 15%, var(--secondary) 85%, transparent 90%), URL(${pCharacter1.src}) left no-repeat, url(${pCharacter2.src}) right no-repeat`;
        console.log("stalemate!");
    }
    else if (pWinnerArray[0] === "win") {
        console.log("0 won")
        pEntry.style.background = `linear-gradient(to right, transparent 10%, var(--winner) 15%, var(--secondary) 30%, var(--secondary) 85%, transparent 90%), URL(${pCharacter1.src}) left no-repeat, url(${pCharacter2.src}) right no-repeat`;
    } else {
        console.log("1 won")
        pEntry.style.background = `linear-gradient(to right, transparent 10%, var(--secondary) 15%, var(--secondary) 70%, var(--winner) 85%, transparent 90%), URL(${pCharacter1.src}) left no-repeat, url(${pCharacter2.src}) right no-repeat`;
    }

    pEntry.style.backgroundSize = 'contain, contain';
}
