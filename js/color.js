
const icon = document.getElementById("change");
const profile = document.getElementById("profile");

icon.addEventListener('click', () => {
    icon.classList.toggle("fa-moon");
    profile.classList.toggle("active");
});

