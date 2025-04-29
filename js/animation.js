
//ScrollReveal
const scrollRevealOption = {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
}

//phone card
ScrollReveal().reveal(".top", {
    ...scrollRevealOption,
    origin: "right",
});
ScrollReveal().reveal(".slide", {
    ...scrollRevealOption,
    origin: "left",
});
ScrollReveal().reveal(".mobile", {
    ...scrollRevealOption,
});

// work projects
ScrollReveal().reveal(".work-card", {
    ...scrollRevealOption,
    origin: "bottom",
});


//testimonals
ScrollReveal().reveal(".testimonial-card", {
    ...scrollRevealOption,
    origin: "right",
});

//service card 
ScrollReveal().reveal(".services-card", {
    ...scrollRevealOption,
    origin: "bottom",
});

//nav logo 
ScrollReveal().reveal(".nav-logo", {
    ...scrollRevealOption,
    origin: "left",
});


ScrollReveal().reveal("#theme-button", {
    ...scrollRevealOption,
    origin: "right",
});


//about page 
ScrollReveal().reveal(".footer-logo", {
    ...scrollRevealOption,
    origin: "left",
});

ScrollReveal().reveal(".grid-card", {
    ...scrollRevealOption,
    origin: "left",
});

//work profile
ScrollReveal().reveal("#profile-cart", {
    ...scrollRevealOption,
    origin: "left",
});