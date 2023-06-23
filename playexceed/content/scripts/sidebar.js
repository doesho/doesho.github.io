const opener = document.getElementById("SideBarOpener");
const sideBarDiv = document.getElementById("SideBar");
const closer = document.getElementById("SideBarCloser");

opener.addEventListener("click", openSideBar);
document.addEventListener("click", closeSideBar);

function openSideBar() { //width set auto, becomes child width (sidebarcontents in sidebarstyle.css)
    sideBarDiv.style.width = "auto";
    sideBarDiv.style.borderRight = "1px solid gray";
    event.stopPropagation();
}

function closeSideBar() {
    if (!sideBarDiv.contains(event.target) || closer.contains(event.target)) {
        sideBarDiv.style.width = "";
        sideBarDiv.style.borderRight = "";
    }
}