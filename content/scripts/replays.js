document.addEventListener("DOMContentLoaded", function () {
    startSearch();
})

// -- OPEN SELECTORS, CLOSE SELECTORS

const characterSelector1 = document.querySelector('[data-characterSelector="1"]');
const characterSelector2 = document.querySelector('[data-characterSelector="2"]');
const selectorOpener1 = document.querySelector('[data-searchInputContainer="characterSearch1"]');
const selectorOpener2 = document.querySelector('[data-searchInputContainer="characterSearch2"]');

let winnerVisible = true;

const seasonsArray = {
    Season7: ["Anji Mito",
        "Axl Low",
        "Baiken",
        "Chipp",
        "Faust",
        "Giovanna",
        "Goldlewis",
        "Happy Chaos",
        "I-No",
        "Jack-O",
        "Ky Kiske",
        "Leo Whitefang",
        "May",
        "Millia Rage",
        "Nagoriyuki",
        "Potemkin",
        "Ramlethal",
        "Sol Badguy",
        "Testament",
        "Zato-1"],
    Season6: ["Byakuya",
        "Chaos",
        "Carmine",
        "Chaos",
        "Enkidu",
        "Gordeau",
        "Hilda",
        "Hyde",
        "Linne",
        "Londrekia",
        "Merkava",
        "Mika",
        "Nanase",
        "Orie",
        "Phonon",
        "Seth",
        "Vatista",
        "Wagner",
        "Waldstein",
        "Yuzuriha"],
    Season5: ["Arakune",
        "Bang Shishigami",
        "Carl Clover",
        "Hakumen",
        "Hazama",
        "Kokonoe",
        "Iron Tager",
        "Jin Kisaragi",
        "Litchi Faye Ling",
        "Nine the Phantom",
        "Noel",
        "Nu-13",
        "Platinum the Trinity",
        "Rachel Alucard",
        "Ragna the Bloodedge",
        "Taokaka"],
    Season4: ["Beheaded",
        "FIGHT",
        "Enchantress",
        "King Knight",
        "Mole Knight",
        "Plague Knight",
        "Polar Knight",
        "Propeller Knight",
        "Shovel & Shield Knight",
        "Specter Knight",
        "Tinker Knight",
        "Treasure Knight"],
    Season3: ["Akuma",
        "Cammy",
        "Chun-Li",
        "C. Viper",
        "Dan",
        "Guile",
        "Ken",
        "M. Bison",
        "Ryu",
        "Sagat",
        "Vega",
        "Zangief"],
    Season2: ["Carl Swangee",
        "Shovel Knight",
        "Celinka",
        "D'Janette",
        "Emogine",
        "Eugenia",
        "Galdred",
        "Geoffrey",
        "Iaquis",
        "Luciya",
        "Minato",
        "Remiliss",
        "Renea",
        "Seijun",
        "Sydney & Serena",
        "Syrus",
        "Taisei",
        "Tournelouse",
        "Umina",
        "Zsolt",],
    Season1: ["Devris",
        "Juno",
        "Pooky",
        "Alice",
        "Baelkhor",
        "Eva",
        "Gabrek",
        "Heidi",
        "Kaden",
        "Lily",
        "Mei Lien",
        "Miska",
        "Morathi",
        "Nehtali",
        "Reese",
        "Satoshi",
        "Super Skullman 33",
        "Ulrik",
        "Vincent",
        "Zoey"],
    Customs: ["Barack Obama",
        "Franklin D. Roosevelt",
        "Fray",
        "Hikaru",
        "J'sahni",
        "Jimmy Carter",
        "Koro",
        "Last Legs",
        "Pope Benedict XVI",
        "Shatotto",
        "Your Opponent"]
}


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
const resultCounter = document.getElementById("ResultCounter");
let resultNumber = 0;

searchButton.addEventListener("click", startSearch);

function startSearch() {
    const buddyID = searchButton.getAttribute('data-searchbuddy-id');
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
};

// - FILTER CHOICES - FUNCTION
//blah

function filterReplayEntries(pEntryContainer, pInputPlayer1, pInputCharacter1, pInputPlayer2, pInputCharacter2, pInputDescription, pWinnerVisible) {

    const blankInput = ["Any Character", ""];

    pEntryContainer.forEach(container => {

        resultNumber = 0;
        const entries = container.querySelectorAll("[data-entry]")

        entries.forEach(entry => {

            let matchFound1 = false;
            let matchFound2 = false;
            let playerDivs = entry.querySelectorAll('[data-tags="playerDiv"]');
            eEntryDisplayType = entry.getAttribute('[data-entry]');
            const characterImgArray = [];
            const winnerArray = [];
            let inputFinalCharacter1;
            let inputFinalCharacter2;

            var ePlayerNames = Array.from(playerDivs)
                .flatMap(playerDiv => Array.from(playerDiv.querySelectorAll('[data-tags="playerName"]')))
                .map(playerNameElement => playerNameElement.textContent.trim().toLowerCase());

            var eCharacterNames = Array.from(playerDivs)
                .flatMap(playerDiv => Array.from(playerDiv.querySelectorAll('[data-tags="characterName"]')))
                .map(characterNameElement => characterNameElement.textContent);

            function seasonUnpacker(pInputCharacter) {

                if (["Season 7", "Season 6", "Season 5", "Season 4", "Season 3", "Season 2", "Season 1", "Customs"].includes(pInputCharacter)) {

                    pInputCharacter = pInputCharacter.replace(/\s+/g, '');

                    if (inputFinalCharacter1 == undefined) {
                        //loop to define character1. 
                        if (seasonsArray[pInputCharacter].includes(eCharacterNames[0])) {

                            return eCharacterNames[0];

                        } else if (seasonsArray[pInputCharacter].includes(eCharacterNames[1])) {
                            return eCharacterNames[1];
                        } else {
                            return pInputCharacter;
                        }
                    } else {
                        //loop to define character2. has to be compared against eCharacterNames in reverse order to allow season mirror searches to work.
                        if (seasonsArray[pInputCharacter].includes(eCharacterNames[1])) {
                            return eCharacterNames[1];
                        } else if (seasonsArray[pInputCharacter].includes(eCharacterNames[0])) {
                            return eCharacterNames[0];
                        } else {
                            return pInputCharacter;
                        }
                    }

                } else {
                    return pInputCharacter;
                }
            }
            inputFinalCharacter1 = seasonUnpacker(pInputCharacter1);
            inputFinalCharacter2 = seasonUnpacker(pInputCharacter2); 

            function adjustOrder() {
                //check if search is empty
                if ((blankInput.includes(inputFinalCharacter1) && blankInput.includes(inputFinalCharacter2)) && (blankInput.includes(pInputPlayer1) && blankInput.includes(pInputPlayer2))) {
                    return false;

                } else if ((eCharacterNames[0] === inputFinalCharacter2 || blankInput.includes(inputFinalCharacter2)) && ((eCharacterNames[1] === inputFinalCharacter1) || blankInput.includes(inputFinalCharacter1))) {

                    //check if players should swap
                    if ((ePlayerNames[0].includes(pInputPlayer2) || blankInput.includes(pInputPlayer2)) && ((ePlayerNames[1].includes(pInputPlayer1)) || blankInput.includes(pInputPlayer1))) {
                        const parent = playerDivs[0].parentNode;
                        const vs = entry.querySelector('[data-vs]');

                        parent.insertBefore(playerDivs[1], playerDivs[0]);
                        parent.insertBefore(vs, playerDivs[0]);
                        playerDivs = entry.querySelectorAll('[data-tags="playerDiv"]'); //update this array
                        return true;
                    }
                }
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
                updateBackgroundArt(entry, characterImgArray[0], characterImgArray[1], winnerArray);
                resultNumber += 1;
                entry.style.display = eEntryDisplayType;
                return;
            }

            if (ePlayerNames[0].includes(pInputPlayer1) && ((eCharacterNames[0] == inputFinalCharacter1) || (blankInput.includes(inputFinalCharacter1)))) {
                matchFound1 = true;
            }

            if (ePlayerNames[1].includes(pInputPlayer2) && ((eCharacterNames[1] == inputFinalCharacter2) || (blankInput.includes(inputFinalCharacter2)))) {
                matchFound2 = true;
            }

            if (matchFound1 && matchFound2) {
                updateBackgroundArt(entry, characterImgArray[0], characterImgArray[1], winnerArray);
                resultNumber += 1;
                entry.style.display = eEntryDisplayType;
            } else {
                entry.style.display = "none";
            }

        });

        if (resultNumber === 1) {
            resultCounter.innerText = `${resultNumber} result`
        } else {
            resultCounter.innerText = `${resultNumber} results`
        }

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

    if ((pWinnerArray[0] === "lose") && (pWinnerArray[1] === "lose")) {
        pEntry.style.background = `linear-gradient(to right, transparent 12%, var(--secondary) 16%, var(--secondary) 84%, transparent 88%), URL(${pCharacter1.src}) left no-repeat, url(${pCharacter2.src}) right no-repeat`;
    }
    else if (pWinnerArray[0] === "win") {
        pEntry.style.background = `linear-gradient(to right, transparent 12%, var(--winner) 16%, var(--secondary) 50%, var(--secondary) 84%, transparent 88%), URL(${pCharacter1.src}) left no-repeat, url(${pCharacter2.src}) right no-repeat`;
    } else {
        pEntry.style.background = `linear-gradient(to right, transparent 12%, var(--secondary) 16%, var(--secondary) 50%, var(--winner) 84%, transparent 88%), URL(${pCharacter1.src}) left no-repeat, url(${pCharacter2.src}) right no-repeat`;
    }

    pEntry.style.backgroundSize = 'contain, contain';
}
