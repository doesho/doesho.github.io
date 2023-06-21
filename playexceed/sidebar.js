const opener = document.getElementById("SideBarOpener");
const sideBarDiv = document.getElementById("SideBar");
const closer = document.getElementById("SideBarCloser");

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
