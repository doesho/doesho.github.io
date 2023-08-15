//clicking increases int by 1. all tooltip elements are disabled. media url is changed to [int], then [int] tooltip is enabled,
//both referencing an individual array.

let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");

let currentPair = 0; //this let changes to pick array pair
let mediaArray = [
    "song-cocktail",
    "song-50off",
    "song-onesmallstep",
    "song-mhw",

];

let tooltipArray = [
    "tooltip-cocktail",
    "tooltip-50off",
    "tooltip-onesmallstep",
    "tooltip-mhw",
];

document.addEventListener('DOMContentLoaded', function () { pairUpdater(0); });
previousButton.addEventListener('click', function () { pairUpdater(1); })
nextButton.addEventListener('click', function () { pairUpdater(-1); })

function pairUpdater(change) { //adjusts currentpair int, makes sure its within bounds
    currentPair += change;
    nextButton.style.visibility = 'visible';
    previousButton.style.visibility = 'visible';
    
    if (currentPair === 0) {
        nextButton.style.visibility = 'hidden';
    } else if (currentPair == mediaArray.length - 1) {
        previousButton.style.visibility = 'hidden';
    }
    mediaElementUpdater();
}

function mediaElementUpdater(){ //loops through all tooltips and media elements, displaying only those matching currentpair int
    for (let i = 0; i < mediaArray.length; i++) {
        let mediaElement = document.getElementById(mediaArray[i]);
        let tooltipElement = document.getElementById(tooltipArray[i]);

        if (i === currentPair) {
            mediaElement.style.display = 'block';
            tooltipElement.style.display = 'block';
        } else {
            mediaElement.style.display = 'none';
            tooltipElement.style.display = 'none';
        }
    }
}

