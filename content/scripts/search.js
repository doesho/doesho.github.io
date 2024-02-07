document.addEventListener("DOMContentLoaded", function () {

    //search function stuff
    const searchInputContainers = document.querySelectorAll(".SearchInputContainer");

    searchInputContainers.forEach(container => {
        const buddyID = container.dataset.searchbuddyId;
        const parentEntryContainer = document.querySelector(`.ParentEntryContainer[data-searchbuddy-id="${buddyID}"]`);

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
// a bit whacky but works. needs to be easier to call. random functions shouldnt have to find associated entrycontainers,
// or that should be public somehow

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

    const entries = pEntryContainer.querySelectorAll(".Entry");

    entries.forEach(entry => {
        const searchTags = entry.querySelector(".Tags").textContent.toLowerCase();

        if (searchTags.includes(pInput)) {
            entry.style.display = pDisplayType;
        } else {
            entry.style.display = "none";
        }
    });

    const catagories = pEntryContainer.querySelectorAll(".EntryCatagory");

    catagories.forEach(catagory => {
        const visibleChoices = catagory.querySelectorAll(`.Entry[style='display: ${pDisplayType};']`);

        if (visibleChoices.length === 0) {
            catagory.style.display = "none";
        } else {
            catagory.style.display = "block";
        }
    });
};