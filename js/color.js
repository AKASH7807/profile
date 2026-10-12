/* ==========================================================================
   PROFILE SUMMARY CARD CONTROLS (color.js)
   Synchronized Dark / Light Theme Toggle & Interactive Controls
   ========================================================================== */

const themeIcon = document.getElementById("change");
const backIcon = document.querySelector(".top-icons .fa-arrow-left");
const heartIcon = document.querySelector(".top-icons .fa-heart");

// Synchronized theme toggle with global body.dark-theme & header button
if (themeIcon) {
    const syncCardIcon = () => {
        const isDark = document.body.classList.contains("dark-theme");
        if (isDark) {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        } else {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    };

    // Initial sync
    syncCardIcon();

    themeIcon.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");

        syncCardIcon();

        // Also sync header theme button
        const headerThemeBtn = document.getElementById("theme-button");
        if (headerThemeBtn) {
            headerThemeBtn.classList.toggle("ri-sun-line", isDark);
            headerThemeBtn.classList.toggle("ri-moon-line", !isDark);
        }

        localStorage.setItem("selected-theme", isDark ? "dark" : "light");
        localStorage.setItem("selected-icon", isDark ? "ri-sun-line" : "ri-moon-line");
    });
}

// Back navigation action
if (backIcon) {
    backIcon.addEventListener("click", () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    });
}

// Interactive heart reaction toggle
if (heartIcon) {
    heartIcon.addEventListener("click", () => {
        heartIcon.classList.toggle("fa-solid");
        heartIcon.classList.toggle("fa-regular");
        heartIcon.style.color = heartIcon.classList.contains("fa-solid") ? "#ec4899" : "";
    });
}
