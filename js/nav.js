function changeMenu(menu) {
    let menus = document.querySelectorAll(".menu")

    menus.forEach(menu => {
        menu.classList.add("hidden")
    })
    document.getElementById(menu + "-menu").classList.remove("hidden")
}

function changeSubMenu(menu,sub) {
    let menus = document.querySelectorAll("." + sub + "-sub")

    menus.forEach(menu => {
        menu.classList.add("hidden")
    })
    document.getElementById(sub + "-" + menu + "-sub").classList.remove("hidden")
    // currentTab = TABS.indexOf(screen);
}