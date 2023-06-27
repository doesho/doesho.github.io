//core search bar functionality

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

//dropdown additional filter functinonality. this is a mess but it does work well

let selector = document.getElementById('CatagorySelect');
let selectedCatagory = "";

let choiceInterview = document.getElementsByClassName('Interview');
let choiceOpinion = document.getElementsByClassName('Opinion');
let choiceNews = document.getElementsByClassName('News');

selector.addEventListener("change", funcCatagory);

function funcCatagory() {
    selectedCatagory = selector.value;

    switch (selectedCatagory){
        case 'Interview':
            for (let i = 0; i < choiceInterview.length; i++) {
                choiceInterview[i].classList.remove('hidden');
            }
            for (let i = 0; i < choiceOpinion.length; i++) {
                choiceOpinion[i].classList.add('hidden');
            }
            for (let i = 0; i < choiceNews.length; i++) {
                choiceNews[i].classList.add('hidden');
            }

            break;
        case 'Opinion':
            for (let i = 0; i < choiceInterview.length; i++) {
                choiceInterview[i].classList.add('hidden');
            }
            for (let i = 0; i < choiceOpinion.length; i++) {
                choiceOpinion[i].classList.remove('hidden');
            }
            for (let i = 0; i < choiceNews.length; i++) {
                choiceNews[i].classList.add('hidden');
            }

            break;
        case 'News':
            for (let i = 0; i < choiceInterview.length; i++) {
                choiceInterview[i].classList.add('hidden');
            }
            for (let i = 0; i < choiceOpinion.length; i++) {
                choiceOpinion[i].classList.add('hidden');
            }
            for (let i = 0; i < choiceNews.length; i++) {
                choiceNews[i].classList.remove('hidden');
            }

            break;
        default:
            for (let i = 0; i < choiceInterview.length; i++) {
                choiceInterview[i].classList.remove('hidden');
            }
            for (let i = 0; i < choiceOpinion.length; i++) {
                choiceOpinion[i].classList.remove('hidden');
            }
            for (let i = 0; i < choiceNews.length; i++) {
                choiceNews[i].classList.remove('hidden');
            }
            break;
    }
}