document.addEventListener("DOMContentLoaded", function () {

    //search function stuff
    const searchInputContainers = document.querySelectorAll("[data-searchInputContainer]");

    searchInputContainers.forEach(container => {
        const buddyID = container.dataset.searchbuddyId;
        const parentEntryContainer = document.querySelectorAll(`[data-parentEntryContainer][data-searchbuddy-id="${buddyID}"]`);
        const searchInput = container.querySelector(".SearchInput");
        const clearButton = container.querySelector(".ClearSearchInput");

        searchInput.addEventListener("input", function () {
            const searchText = this.value.toLowerCase();

            funcNewSearch(searchText, parentEntryContainer);
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
    funcNewSearch("", pEntryContainer);
};

// -- SEARCH FILTER FUNCTION
//funcNewSearch is the perfect man. He is courageous but sensitive when he needs to be. He
//has 12 all new outfits and comes free with this Play Exceed playset!
//pInput is the search input. pContainer is the parent div of Entries and Catagories searched through
function funcNewSearch(pInput, pEntryContainer) {

    const input = pInput.toLowerCase();

    pEntryContainer.forEach(container => {

        const entries = container.querySelectorAll('[data-entry]');

        entries.forEach(entry => {
            const searchTags = entry.querySelectorAll('[data-tags]');
            const eEntryDisplayType = entry.getAttribute('data-entry');
            let entryMatch = false;
            console.log(eEntryDisplayType);
            searchTags.forEach(tag => {
                const tagContent = tag.textContent.toLowerCase();
                if (tagContent.includes(input)) {
                    entryMatch = true;
                }
            });

            if (entryMatch) {
                entry.style.display = eEntryDisplayType;
            } else {
                entry.style.display = "none";
            }
        });

        const catagories = container.querySelectorAll("[data-entryCatagory]");

        catagories.forEach(catagory => {

            //return a list of data-entry whose style is set to their data-entry 
            const visibleEntries = Array.from(catagory.querySelectorAll('[data-entry]')).filter(entry => {
                const entryDisplayType = entry.getAttribute('data-entry');
                const computedDisplay = window.getComputedStyle(entry).display;
                return computedDisplay === entryDisplayType;
            });

            if (visibleEntries.length === 0) {
                catagory.style.display = "none";
            } else {
                catagory.style.display = "block";
            }
        });

    });
};