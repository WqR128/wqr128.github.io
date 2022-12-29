let tabNavbar = document.querySelector('.tab-navbar');
let tabs = tabNavbar.querySelectorAll("input");
let avtive = 1;
tabs[0].checked = true;

setInterval(() => {
    if (avtive >= tabs.length) {
        avtive = 0
    }
    tabs[avtive].checked = true;
    avtive = avtive + 1;
}, 15 * 1e03);