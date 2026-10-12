/* ==========================================================================
   AKASH M - PORTFOLIO INTERACTION LOGIC
   Vanilla JavaScript - Clean, Reliable, Zero Frameworks
   ========================================================================== */

// NAVIGATION MENU (Mobile Drawer & Side Slider)
const initNavigation = () => {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");
    let navOverlay = document.getElementById("nav-overlay");
    const navLinks = document.querySelectorAll(".nav-item a");

    // Ensure backdrop overlay exists
    if (!navOverlay) {
        navOverlay = document.createElement("div");
        navOverlay.id = "nav-overlay";
        navOverlay.className = "nav-overlay";
        document.body.appendChild(navOverlay);
    }

    const openMenu = () => {
        if (!navMenu) return;
        navMenu.classList.add('show-menu');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        if (window.portfolioLenis && typeof window.portfolioLenis.stop === 'function') {
            window.portfolioLenis.stop();
        }
    };

    const closeMenu = () => {
        if (!navMenu) return;
        navMenu.classList.remove('show-menu');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        if (window.portfolioLenis && typeof window.portfolioLenis.start === 'function') {
            window.portfolioLenis.start();
        }
    };

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenu && navMenu.classList.contains('show-menu')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (navClose) {
        navClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            closeMenu();
        });
    }

    // Close on clicking outside menu on mobile
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('show-menu')) {
            if (!navMenu.contains(e.target) && (!navToggle || !navToggle.contains(e.target))) {
                closeMenu();
            }
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
            closeMenu();
        }
    });

    // Reset when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navMenu && navMenu.classList.contains('show-menu')) {
            closeMenu();
        }
    });

    // Highlight current page active link
    const currentPath = window.location.pathname.toLowerCase();
    navLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (!href) return;
        if (
            (currentPath.endsWith(href) && href !== 'index.html') ||
            (href === 'index.html' && (currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === ''))
        ) {
            link.classList.add('active-link');
        }
    });
};
initNavigation();

// CHANGE BACKGROUND HEADER & SCROLLUP BUTTON ON SCROLL
const scrollHeader = () => {
    const header = document.getElementById("header");
    const scrollUp = document.getElementById("scroll-up");
    const scrollY = window.scrollY;

    if (header) {
        scrollY >= 40 ? header.classList.add('bg-header') : header.classList.remove('bg-header');
    }

    if (scrollUp) {
        scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
    }
};
window.addEventListener('scroll', scrollHeader);

// SERVICES MODALS
const modal = document.querySelectorAll(".services-modal");
const modalButton = document.querySelectorAll(".services-button");
const modalClose = document.querySelectorAll(".services-modal-close");

let activeModal = (modalClick) => {
    if (modal[modalClick]) {
        modal[modalClick].classList.add("active-modal");
        document.body.style.overflow = "hidden";
        if (window.portfolioLenis) window.portfolioLenis.stop();
    }
};

modalButton.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        activeModal(i);
    });
});

const closeModals = () => {
    modal.forEach((modalRemove) => {
        modalRemove.classList.remove("active-modal");
    });
    document.body.style.overflow = "";
    if (window.portfolioLenis) window.portfolioLenis.start();
};

modalClose.forEach((closeBtn) => {
    closeBtn.addEventListener('click', closeModals);
});

// Click outside modal to close
modal.forEach((modalOverlay) => {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModals();
        }
    });
});

// ESC key to close modal & mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModals();
        if (navMenu) navMenu.classList.remove('show-menu');
    }
});

// DARK / LIGHT THEME TOGGLE (Persistent)
const themeButton = document.getElementById("theme-button");
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton && themeButton.classList.contains(iconTheme) ? "ri-sun-line" : "ri-moon-line";

if (selectedTheme) {
    const isDark = selectedTheme === 'dark';
    document.body.classList[isDark ? 'add' : 'remove'](darkTheme);
    if (themeButton) {
        themeButton.classList[selectedIcon === 'ri-sun-line' ? 'add' : 'remove'](iconTheme);
    }
    const cardIcon = document.getElementById("change");
    if (cardIcon) {
        cardIcon.classList.toggle("fa-moon", isDark);
        cardIcon.classList.toggle("fa-sun", !isDark);
    }
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);

        const cardIcon = document.getElementById("change");
        if (cardIcon) {
            const isDark = document.body.classList.contains(darkTheme);
            cardIcon.classList.toggle("fa-moon", isDark);
            cardIcon.classList.toggle("fa-sun", !isDark);
        }

        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());

        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
}

// ==========================================================================
// CINEMATIC PRE-LOADER & EXPERIENCE ORCHESTRATOR
// ==========================================================================
function initCinematicLoader() {
    const loader = document.getElementById("loading");
    if (!loader) {
        window.dispatchEvent(new CustomEvent('page-loaded'));
        return;
    }

    const progressBar = document.getElementById("loader-progress-bar");
    const percentageText = document.getElementById("loader-percentage");
    const statusText = document.getElementById("loader-status");

    let progress = 0;
    let isFinished = false;

    const statuses = [
        { max: 20, text: "INITIALIZING CREATIVE ENGINE..." },
        { max: 48, text: "LOADING ASSETS & COMPONENTS..." },
        { max: 78, text: "CRAFTING CINEMATIC EXPERIENCE..." },
        { max: 96, text: "POLISHING INTERFACE..." },
        { max: 100, text: "WELCOME" }
    ];

    function updateStatus(val) {
        if (!statusText) return;
        const matched = statuses.find(s => val <= s.max) || statuses[statuses.length - 1];
        if (statusText.textContent !== matched.text) {
            statusText.textContent = matched.text;
        }
    }

    function finishLoader() {
        if (isFinished) return;
        isFinished = true;

        progress = 100;
        if (progressBar) progressBar.style.width = "100%";
        if (percentageText) percentageText.textContent = "100%";
        if (statusText) statusText.textContent = "WELCOME";

        // Brief pause at 100% so user sees 'WELCOME'
        setTimeout(() => {
            loader.classList.add("stop-loading");
            window.dispatchEvent(new CustomEvent('page-loaded'));

            if (typeof ScrollTrigger !== 'undefined') {
                setTimeout(() => ScrollTrigger.refresh(), 300);
            }

            setTimeout(() => {
                loader.style.display = "none";
            }, 1000);
        }, 320);
    }

    // High performance smooth progression
    const startTime = performance.now();
    const duration = 1350; // Smooth 1.35s cinematic introduction

    function frame(now) {
        if (isFinished) return;

        const elapsed = now - startTime;
        const ratio = Math.min(1, elapsed / duration);
        // Smooth easeInOut acceleration
        const eased = ratio < 0.5 ? 2 * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 2) / 2;
        const target = Math.min(99, Math.floor(eased * 100));

        if (target > progress) {
            progress = target;
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (percentageText) percentageText.textContent = `${progress}%`;
            updateStatus(progress);
        }

        if (elapsed < duration) {
            requestAnimationFrame(frame);
        } else {
            finishLoader();
        }
    }

    requestAnimationFrame(frame);

    // Fallback safety triggers
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!isFinished) finishLoader();
        }, 1400);
    });

    setTimeout(() => {
        if (!isFinished) finishLoader();
    }, 2800);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicLoader);
} else {
    initCinematicLoader();
}

// ==========================================================================
// RECENT PROJECTS: FILTER TABS & PAGINATION LOGIC
// ==========================================================================
function initProjectFilterAndPagination() {
    const workSection = document.querySelector('.work-page');
    if (!workSection) return;

    const cards = Array.from(workSection.querySelectorAll('.work-card'));
    const filterButtons = workSection.querySelectorAll('.work-filter-btn');
    const paginationContainer = workSection.querySelector('.work-pagination');
    if (!cards.length || !paginationContainer) return;

    const ITEMS_PER_PAGE = 6;
    let currentFilter = 'all';
    let currentPage = 1;

    // Categorization logic based on .work-subtitle
    const getCardCategory = (card) => {
        if (card.dataset.category) return card.dataset.category;
        const sub = (card.querySelector('.work-subtitle')?.textContent || '').toLowerCase().trim();
        if (sub.includes('full') || sub.includes('mern')) return 'full-stack';
        if (sub.includes('design')) return 'ui-design';
        return 'web-dev';
    };

    const getFilteredCards = () => {
        if (currentFilter === 'all') return cards;
        return cards.filter(card => getCardCategory(card) === currentFilter);
    };

    function render(animate = true) {
        const filtered = getFilteredCards();
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        // Hide all cards first
        cards.forEach(c => {
            c.style.display = 'none';
        });

        // Show slice for current page
        const visibleSlice = filtered.slice(startIndex, endIndex);
        visibleSlice.forEach(card => {
            card.style.display = 'flex';
        });

        if (animate && typeof gsap !== 'undefined') {
            gsap.killTweensOf(visibleSlice);
            gsap.fromTo(visibleSlice, 
                { opacity: 0, y: 24, scale: 0.96 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    duration: 0.45, 
                    stagger: 0.05, 
                    ease: 'power2.out',
                    clearProps: 'transform,scale'
                }
            );
        } else {
            visibleSlice.forEach(card => {
                card.style.opacity = '1';
            });
        }

        // Refresh ScrollTrigger calculations
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }

        // Update badge count if present
        const badge = workSection.querySelector('.project-badge');
        if (badge) {
            badge.textContent = filtered.length;
        }

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        paginationContainer.style.display = 'flex';

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = `pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i class="ri-arrow-left-s-line"></i> Prev';
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                render();
                scrollToProjects();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Numbered Pages
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                if (currentPage !== i) {
                    currentPage = i;
                    render();
                    scrollToProjects();
                }
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = `pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = 'Next <i class="ri-arrow-right-s-line"></i>';
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                render();
                scrollToProjects();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    function scrollToProjects() {
        if (window.portfolioLenis) {
            window.portfolioLenis.scrollTo(workSection, { offset: -80, duration: 1.1 });
        } else {
            const top = workSection.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    // Filter Button Clicks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter || 'all';
            currentPage = 1;
            render();
        });
    });

    // Initial render
    render();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectFilterAndPagination);
} else {
    initProjectFilterAndPagination();
}

