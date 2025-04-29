const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

// CHANGE BACKGROUND HEADER//

const bgHeader = () => {
    const header = document.getElementById("header");
    this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header');
}
window.addEventListener('scroll', bgHeader);

//SERVICE MODAL //
const modal = document.querySelectorAll(".services-modal");
const modalButton = document.querySelectorAll(".services-button");
const modalClose = document.querySelectorAll(".services-modal-close");

let activeModal = (modalClick) => {
    modal[modalClick].classList.add("active-modal");
}

modalButton.forEach((modalButton, i) => {
    modalButton.addEventListener('click', () => {
        activeModal(i)
    })
})

modalClose.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modal.forEach((modalRemove) => {
            modalRemove.classList.remove("active-modal");
        })
    })
})

/// profile additional function ///
//scroll bar

const themeButton = document.getElementById("theme-button");
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => document.body.classList.contains(darkTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    document.body.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme);
    themeButton.style.color = "#fff"

    localStorage.setItem('selected-Theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})


// loading animation 
const loading = document.getElementById("loading")

setTimeout(() => {
    loading.classList.add("stop-loading")
}, 1000)
