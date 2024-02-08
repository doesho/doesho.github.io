document.addEventListener("DOMContentLoaded", function () {

    //search function stuff
    const searchInputContainers = document.querySelectorAll("[data-searchInputContainer]");

    searchInputContainers.forEach(container => {
        const buddyID = container.dataset.searchbuddyId;
        const parentEntryContainer = document.querySelector(`[data-parentEntryContainer][data-searchbuddy-id="${buddyID}"]`);

        const searchInput = container.querySelector(".SearchInput");
        const clearButton = container.querySelector(".ClearSearchInput");

        searchInput.addEventListener("input", function () {
            const searchText = this.value.toLowerCase();

            funcNewSearch(searchText, parentEntryContainer, "flex");
        });

        clearButton.addEventListener("click", function () {

            clearInputField(container, parentEntryContainer);
        })
    });

    //update opener stuff


});

// -- CLEAR INPUT FIELD
// a bit whacky but works. needs to be easier to call. random functions calling this shouldnt have to find associated 
//entrycontainers, or that should be public somehow

function clearInputField(pContainer, pEntryContainer) {
    const searchInput = pContainer.querySelector("input");
    searchInput.value = "";
    funcNewSearch("", pEntryContainer, "flex");
};

// -- SEARCH FILTER FUNCTION
//funcNewSearch is the perfect man. He is courageous but sensitive when he needs to be. He
//has 12 all new outfits and comes free with this Play Exceed playset!
//pInput is the search input. pContainer is the parent div of Entries and Catagories searched through
function funcNewSearch(pInput, pEntryContainer, pDisplayType) {

    const input = pInput.toLowerCase();
    const entries = pEntryContainer.querySelectorAll('[data-entry]');

    entries.forEach(entry => {
        const searchTags = entry.querySelectorAll('[data-tags]');
        let entryMatch = false;

        searchTags.forEach(tag => {
            const tagContent = tag.textContent.toLowerCase();
            if (tagContent.includes(input)) {
                entryMatch = true;
            }
        });

        if (entryMatch) {
            entry.style.display = pDisplayType;
        } else {
            entry.style.display = "none";
        }
    });

    const catagories = pEntryContainer.querySelectorAll("[data-entryCatagory]");

    catagories.forEach(catagory => {
        const visibleChoices = catagory.querySelectorAll(`[data-entry][style='display: ${pDisplayType};']`);

        if (visibleChoices.length === 0) {
            catagory.style.display = "none";
        } else {
            catagory.style.display = "block";
        }
    });
};