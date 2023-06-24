const opener = document.getElementById("SideNavOpener");
const sideNavDiv = document.getElementById("SideNav");
const closer = document.getElementById("SideNavCloser");

opener.addEventListener("click", openSideNav);
document.addEventListener("click", closeSideNav);

function openSideNav() { //width set auto, becomes child width (sideNavcontents in sideNavstyle.css)
    sideNavDiv.style.width = "auto";
    sideNavDiv.style.borderRight = "1px solid gray";
    event.stopPropagation();
}

function closeSideNav() {
    if (!sideNavDiv.contains(event.target) || closer.contains(event.target)) {
        sideNavDiv.style.width = "";
        sideNavDiv.style.borderRight = "";
    }
}