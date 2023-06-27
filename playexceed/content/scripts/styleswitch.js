// style changer. make generic

const button = document.getElementById("StyleButton");
const lines = document.getElementById("LineSheet");
const cubes = document.getElementById("CubeSheet");
let styleStateIndex = 0;
let currentState;

if (cubes && lines) {
    cubes.disabled = true;
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
            cubes.disabled = false;
            currentState = "Grid (Busted)";
            break;
        case 1:
            cubes.disabled = true;
            lines.disabled = false;
            currentState = "Default";
            break;
    }
    styleStateIndex++;
    document.getElementById("ButtonText").innerHTML = currentState;
}