
// Close CharacterSelector when a CharacterChoice is clicked
const characterChoices = document.querySelectorAll('.CharacterChoice');
characterChoices.forEach(choice => {
    choice.addEventListener('click', function () {
        closeCharacterSelector();
    });
});

// generic "close the selectors" function

function closeCharacterSelector() {
    selectorContainer.forEach(container => {
        const characterSelector = container.querySelector('.CharacterSelector');
        characterSelector.style.display = 'none';
    });
}

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

//filter character choice

document.addEventListener("DOMContentLoaded", function () {
    const selectorContainers = document.querySelectorAll(".SelectorContainer");

    selectorContainers.forEach(container => {
        const searchInput = container.querySelector(".CharacterSelector input");
        const characterChoices = container.querySelectorAll(".CharacterChoice");

        searchInput.addEventListener("input", function () {
            const searchText = this.value.toLowerCase();

            characterChoices.forEach(choice => {
                const characterLabel = choice.querySelector(".CharacterLabel").textContent.toLowerCase();

                if (characterLabel.includes(searchText)) {
                    choice.style.display = "block"; // Show the choice if it matches the search text
                } else {
                    choice.style.display = "none"; // Hide the choice if it doesn't match the search text
                }
            });

            // Hide CharacterSeason divs with no visible CharacterChoices
            const characterSeasons = container.querySelectorAll(".CharacterSeason");
            characterSeasons.forEach(season => {
                const visibleChoices = season.querySelectorAll(".CharacterChoice[style='display: block;']");

                if (visibleChoices.length === 0) {
                    season.style.display = "none"; // Hide the season if no visible choices
                } else {
                    season.style.display = "block"; // Show the season if there are visible choices
                }
            });
        });
    });
});

//input selection to display as opener

document.addEventListener("DOMContentLoaded", function () {
    const selectorOpeners = document.querySelectorAll(".SelectorOpener");
    const characterChoices = document.querySelectorAll(".CharacterChoice");

    // Add event listeners to each CharacterChoice button
    characterChoices.forEach(choice => {
        choice.addEventListener("click", function () {
            const characterLabel = this.querySelector(".CharacterLabel").textContent;
            const charIconSrc = this.querySelector(".CharIcon").getAttribute("src");

            // Update SelectorOpener content and styling
            const opener = this.closest(".SelectorContainer").querySelector(".SelectorOpener");
            opener.innerHTML = `<img src="${charIconSrc}" class="CharIcon" /> ${characterLabel}`;
            opener.classList.add("selected"); // Add a class for styling if needed
        });
    });
});

// filter page results