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

// lightmode darkmode. hard coded to remain this way.

const modeButton = document.getElementById("ModeButton");
const lightmode = document.getElementById("LightMode")
const darkmode = document.getElementById("DarkMode")
let modeStateIndex = 1;
let modeState;

if (darkmode && lightmode) {
    darkmode.disabled = true;
    modeState = "Light [this wont save]";
    document.getElementById("ModeButtonText").innerHTML = modeState;
}

modeButton.addEventListener("click", modeSwitch);

function modeSwitch() {
    if (modeStateIndex > 1) {
        modeStateIndex = 0;
    }

    switch (modeStateIndex) {
        case 0:
            lightmode.disabled = false;
            darkmode.disabled = true;
            modeState = "Light";
            break;
        case 1:
            lightmode.disabled = true;
            darkmode.disabled = false;
            modeState = "Dark";
            break;
    }
    modeStateIndex++;
    document.getElementById("ModeButtonText").innerHTML = modeState;
}