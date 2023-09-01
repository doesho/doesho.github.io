// style changer. make generic

const button = document.getElementById("StyleButton");
const lines = document.getElementById("LineSheet");
const compact = document.getElementById("CompactSheet");
let styleStateIndex = 0;
let currentState;

if (compact && lines) {
    compact.disabled = true;
    currentState = "Default";
    document.getElementById("ButtonText").innerHTML = currentState;
}

button.addEventListener("click", styleSwitch);

function styleSwitch() {

    if (styleStateIndex > 1) {
        styleStateIndex = 0;
    }

    switch (styleStateIndex) {
        case 0:
            lines.disabled = true;
            compact.disabled = false;
            currentState = "Compact";
            break;
        case 1:
            lines.disabled = false;
            compact.disabled = true;
            currentState = "Default";
            break;
    }
    styleStateIndex++;
    document.getElementById("ButtonText").innerHTML = currentState;
}