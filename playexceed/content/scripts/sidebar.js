const opener = document.getElementById("SideBarOpener");
const sideBarDiv = document.getElementById("SideBar");
const closer = document.getElementById("SideBarCloser");

opener.addEventListener("click", openSideBar);
closer.addEventListener("click", closeSideBar);

function openSideBar() { //width set auto, becomes child width (sidebarcontents in sidebarstyle.css)
    sideBarDiv.style.width = "auto";
    sideBarDiv.style.borderRight = "1px solid gray";
}

function closeSideBar() { //resets values to pagestyle.css values
    sideBarDiv.style.width = "";
    sideBarDiv.style.borderRight = "";
}
