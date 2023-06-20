const opener = document.getElementById("SideNavOpener");
const sideBarDiv = document.getElementById("SideNavBar");
const closer = document.getElementById("SideNavCloser");

opener.addEventListener("click", openSideBar);
closer.addEventListener("click", closeSideBar);

function openSideBar() {
    sideBarDiv.style.width = "100px";
    sideBarDiv.style.padding = "10px";
    sideBarDiv.style.borderRight = "1px solid gray";
}

function closeSideBar() {
    sideBarDiv.style.width = "0px";
    sideBarDiv.style.padding = "0px";
    sideBarDiv.style.borderRight = "none";
}
