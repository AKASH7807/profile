/* ==========================================================================
   AKASH M - PORTFOLIO SMOOTH GSAP PARALLAX & ANIMATION ENGINE (animation.js)
   Supercharged with Lenis Smooth Scrolling, GSAP 3 & ScrollTrigger
   ========================================================================== */

(function () {
    'use strict';

    // --------------------------------------------------------------------------
    // 0. Auto-Inject Progress Bar, Custom Cursor & Ambient Parallax Orbs
    // --------------------------------------------------------------------------
    function initDOMDecorations() {
        // Top Scroll Progress Indicator
        if (!document.querySelector('.scroll-progress-bar')) {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress-bar';
            document.body.prepend(progressBar);
        }

        // Custom Cursor & Follower (Desktop Pointer Only)
        const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (isFinePointer && !document.querySelector('.custom-cursor')) {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            const follower = document.createElement('div');
            follower.className = 'custom-cursor-follower';
            document.body.appendChild(cursor);
            document.body.appendChild(follower);
        }

        // Ambient Parallax Orbs (Subtle Depth Atmosphere)
        if (!document.querySelector('.ambient-orb')) {
            const orb1 = document.createElement('div');
            orb1.className = 'ambient-orb ambient-orb-1';
            const orb2 = document.createElement('div');
            orb2.className = 'ambient-orb ambient-orb-2';
            const orb3 = document.createElement('div');
            orb3.className = 'ambient-orb ambient-orb-3';
            document.body.prepend(orb1, orb2, orb3);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDOMDecorations);
    } else {
        initDOMDecorations();
    }

    // --------------------------------------------------------------------------
    // 1. Lenis Smooth Momentum Scrolling + GSAP ScrollTrigger Synchronization
    // --------------------------------------------------------------------------
    let lenis = null;

    function initSmoothScroll() {
        if (typeof Lenis !== 'undefined') {
            lenis = new Lenis({
                duration: 1.15,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1.05,
                touchMultiplier: 1.5,
                infinite: false
            });

            // Synchronize with GSAP ScrollTrigger
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                gsap.ticker.lagSmoothing(0);
            } else {
                function raf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);
            }

            // Expose globally for external triggers (modals, filters, pagination)
            window.portfolioLenis = lenis;
        }

        // Smooth Anchor Navigation
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    if (lenis) {
                        lenis.scrollTo(target, { offset: -70, duration: 1.2 });
                    } else {
                        const headerOffset = 70;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // 2. High-Performance Custom Cursor & Elastic Magnetic Follower
    // --------------------------------------------------------------------------
    function initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.custom-cursor-follower');
        if (!cursor || !follower || typeof gsap === 'undefined') return;

        // Optimized quickTo tweens for 120fps tracking
        const xToCursor = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power2.out' });
        const yToCursor = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power2.out' });
        const xToFollower = gsap.quickTo(follower, 'x', { duration: 0.38, ease: 'power3.out' });
        const yToFollower = gsap.quickTo(follower, 'y', { duration: 0.38, ease: 'power3.out' });

        let isVisible = false;

        window.addEventListener('mousemove', (e) => {
            if (!isVisible) {
                gsap.to([cursor, follower], { opacity: 1, duration: 0.25 });
                isVisible = true;
            }
            xToCursor(e.clientX);
            yToCursor(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
        });

        document.addEventListener('mouseleave', () => {
            gsap.to([cursor, follower], { opacity: 0, duration: 0.25 });
            isVisible = false;
        });

        // Hover expansions on interactive components
        const interactiveSelector = `
            a, button, input, textarea,
            .work-card, .services-card, .bento-box, .profile,
            .work-filter-btn, .pagination-btn, .theme-button,
            .nav-toggle, .services-button, .home-button, .home-button-secondary,
            .ticker-text, .link
        `;

        document.querySelectorAll(interactiveSelector).forEach((el) => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // --------------------------------------------------------------------------
    // 3. Magnetic Button Micro-Interactions
    // --------------------------------------------------------------------------
    function initMagneticButtons() {
        if (typeof gsap === 'undefined') return;
        const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!isFinePointer) return;

        const magneticElements = document.querySelectorAll(`
            .home-button, .home-button-secondary, .btn-contact, .contact-send,
            .home-social-link, .footer-social-link,
            #theme-button, #nav-toggle, .nav-logo
        `);

        magneticElements.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.32;
                const deltaY = (e.clientY - centerY) * 0.32;

                gsap.to(el, {
                    x: deltaX,
                    y: deltaY,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.35)',
                    overwrite: 'auto'
                });
            });
        });
    }

    // --------------------------------------------------------------------------
    // 4. 3D Card Tilt Physics & Dynamic Spotlight Follower
    // --------------------------------------------------------------------------
    function init3DCardTilt() {
        if (typeof gsap === 'undefined') return;
        const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!isFinePointer) return;

        const tiltCards = document.querySelectorAll(`
            .work-card, .services-card, .bento-box,
            .link-page .right .box, #profile-cart .profile
        `);

        tiltCards.forEach((card) => {
            // Inject spotlight overlay if absent
            if (!card.querySelector('.card-spotlight')) {
                const spotlight = document.createElement('div');
                spotlight.className = 'card-spotlight';
                card.prepend(spotlight);
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                // Update CSS variables for radial glow
                card.style.setProperty('--mouse-x', `${mouseX}px`);
                card.style.setProperty('--mouse-y', `${mouseY}px`);

                // 3D perspective rotation
                const rotateY = ((mouseX / rect.width) - 0.5) * 12;
                const rotateX = -((mouseY / rect.height) - 0.5) * 12;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.025,
                    transformPerspective: 900,
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        });
    }

    // --------------------------------------------------------------------------
    // 5. Multi-Layer Parallax Scrolling (GSAP ScrollTrigger)
    // --------------------------------------------------------------------------
    function initParallaxEffects() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // A. Ambient Glowing Orbs Parallax
        const orb1 = document.querySelector('.ambient-orb-1');
        const orb2 = document.querySelector('.ambient-orb-2');
        const orb3 = document.querySelector('.ambient-orb-3');

        if (orb1) {
            gsap.to(orb1, {
                yPercent: -45,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5
                }
            });
        }

        if (orb2) {
            gsap.to(orb2, {
                yPercent: 40,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5
                }
            });
        }

        if (orb3) {
            gsap.to(orb3, {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 2
                }
            });
        }

        // B. Hero Parallax Elements (index.html)
        const homeSection = document.querySelector('.home.section');
        if (homeSection) {
            const homeProfile = homeSection.querySelector('.home-profile');
            const homeRectangle = homeSection.querySelector('.home-rectangle');
            const homeData = homeSection.querySelector('.home-data');

            if (homeProfile) {
                gsap.to(homeProfile, {
                    yPercent: 12,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: homeSection,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1.2
                    }
                });
            }

            if (homeRectangle) {
                gsap.to(homeRectangle, {
                    yPercent: 20,
                    xPercent: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: homeSection,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1.4
                    }
                });
            }

            if (homeData) {
                gsap.to(homeData, {
                    yPercent: -8,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: homeSection,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }
        }

        // C. Mobile Phone Mockup & Showcase Parallax (index.html)
        const projectLinksSection = document.querySelector('.project-links');
        if (projectLinksSection) {
            const mobileMockup = projectLinksSection.querySelector('.left.mobile img');
            if (mobileMockup) {
                gsap.to(mobileMockup, {
                    yPercent: 8,
                    rotate: -2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: projectLinksSection,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.2
                    }
                });
            }

            // Animate right column as a unified block so card gaps stay perfectly uniform!
            const rightColumn = projectLinksSection.querySelector('.link-page .right');
            if (rightColumn) {
                gsap.to(rightColumn, {
                    yPercent: -6,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: projectLinksSection,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.2
                    }
                });
            }
        }

        // D. Top Scroll Progress Indicator
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            gsap.to(progressBar, {
                width: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.2
                }
            });
        }
    }

    // --------------------------------------------------------------------------
    // 6. Kinetic Typography (Letter-by-Letter Masked Slide Reveal & Robust Scroll Trigger)
    // --------------------------------------------------------------------------
    function splitTextIntoChars(element) {
        if (!element || element.dataset.splitDone) return null;
        element.dataset.splitDone = 'true';

        const originalText = element.textContent.trim();
        element.setAttribute('aria-label', originalText);

        const childNodes = Array.from(element.childNodes);
        element.innerHTML = '';

        const charSpans = [];
        const badgeElements = [];

        function appendWord(parent, word) {
            if (!word) return;
            const wordWrap = document.createElement('span');
            wordWrap.className = 'split-word';
            for (const char of word) {
                const charSpan = document.createElement('span');
                charSpan.className = 'split-char';
                charSpan.textContent = char;
                wordWrap.appendChild(charSpan);
                charSpans.push(charSpan);
            }
            parent.appendChild(wordWrap);
        }

        function appendSpace(parent) {
            const space = document.createElement('span');
            space.className = 'split-space';
            space.innerHTML = '&nbsp;';
            parent.appendChild(space);
        }

        childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const tokens = text.match(/\S+|\s+/g) || [];
                tokens.forEach((token) => {
                    if (/^\s+$/.test(token)) {
                        appendSpace(element);
                    } else {
                        appendWord(element, token);
                    }
                });
            } else if (node.nodeName === 'BR') {
                element.appendChild(document.createElement('br'));
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.classList && node.classList.contains('project-badge')) {
                    node.classList.add('split-badge');
                    element.appendChild(node);
                    badgeElements.push(node);
                } else {
                    const subWrapper = document.createElement(node.tagName.toLowerCase());
                    if (node.className) subWrapper.className = node.className;
                    if (node.id) subWrapper.id = node.id;
                    if (node.style.cssText) subWrapper.style.cssText = node.style.cssText;

                    // Preserve and mark highlighted spans so words & chars inherit gradient cleanly
                    if (node.tagName.toLowerCase() === 'span' || (node.classList && node.classList.contains('title-highlight'))) {
                        subWrapper.classList.add('title-highlight', 'split-highlight');
                    }

                    const text = node.textContent;
                    const tokens = text.match(/\S+|\s+/g) || [];
                    tokens.forEach((token) => {
                        if (/^\s+$/.test(token)) {
                            appendSpace(subWrapper);
                        } else {
                            appendWord(subWrapper, token);
                        }
                    });
                    element.appendChild(subWrapper);
                }
            }
        });

        return { chars: charSpans, badges: badgeElements };
    }

    function initSplitTextTypography() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Target all section titles, bento titles, link titles, and timeline titles across all pages
        const targetHeadings = document.querySelectorAll('.section-title, .bento-title, .link-title, .timeline-title');

        targetHeadings.forEach((title) => {
            try {
                const splitData = splitTextIntoChars(title);
                if (!splitData || !splitData.chars.length) return;

                if (prefersReducedMotion) {
                    gsap.set(splitData.chars, { opacity: 1, yPercent: 0, rotateZ: 0 });
                    if (splitData.badges && splitData.badges.length) {
                        gsap.set(splitData.badges, { opacity: 1, scale: 1 });
                    }
                    return;
                }

                // Initially position characters below their overflow mask
                gsap.set(splitData.chars, {
                    yPercent: 110,
                    opacity: 0,
                    rotateZ: 2
                });

                if (splitData.badges && splitData.badges.length) {
                    gsap.set(splitData.badges, {
                        scale: 0.6,
                        opacity: 0
                    });
                }

                // Create a timeline that reveals the heading and guarantees clean, permanent visibility
                const tl = gsap.timeline({
                    paused: true,
                    onComplete: () => {
                        // Clear transforms & overflow masks on completion so text is 100% stable, sharp, and visible
                        gsap.set(splitData.chars, {
                            opacity: 1,
                            yPercent: 0,
                            rotateZ: 0,
                            clearProps: 'transform,rotateZ'
                        });
                        title.querySelectorAll('.split-word').forEach((w) => {
                            w.style.overflow = 'visible';
                        });
                        if (splitData.badges && splitData.badges.length) {
                            gsap.set(splitData.badges, {
                                opacity: 1,
                                scale: 1,
                                clearProps: 'transform'
                            });
                        }
                    }
                });

                tl.to(splitData.chars, {
                    yPercent: 0,
                    opacity: 1,
                    rotateZ: 0,
                    duration: 0.65,
                    stagger: {
                        each: 0.02,
                        from: 'start'
                    },
                    ease: 'power3.out',
                    overwrite: 'auto'
                });

                if (splitData.badges && splitData.badges.length) {
                    tl.to(splitData.badges, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'back.out(2)',
                        overwrite: 'auto'
                    }, '-=0.3');
                }

                // Bind ScrollTrigger directly to the title element
                // Reveal once it scrolls into the viewport and stay visible!
                ScrollTrigger.create({
                    trigger: title,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                    onEnter: () => tl.play(),
                    once: true
                });

                // Immediate check for elements already inside the viewport on initial page load
                // (e.g., top section titles on about.html, contact.html, or refreshed scroll position)
                const rect = title.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.92 && rect.bottom >= 0) {
                    // Small delay to ensure smooth paint if page is still initializing
                    setTimeout(() => {
                        tl.play();
                    }, 60);
                }
            } catch (err) {
                console.warn('Split text error on heading, fallback to visible:', err);
                title.style.opacity = '1';
                title.style.visibility = 'visible';
            }
        });
    }

    // --------------------------------------------------------------------------
    // 7. Cinematic Scroll Entrance Reveals (GSAP Choreography)
    // --------------------------------------------------------------------------
    function initScrollReveals() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // A. Hero Section Initial Load Animation
        const homeSection = document.querySelector('.home.section');
        if (homeSection) {
            const nameEl = homeSection.querySelector('.home-name');
            const profEl = homeSection.querySelector('.home-profession');

            const nameSplit = splitTextIntoChars(nameEl);
            const profSplit = splitTextIntoChars(profEl);

            if (nameSplit && nameSplit.chars.length) {
                gsap.set(nameSplit.chars, { yPercent: 125, opacity: 0, rotateZ: 3 });
            }
            if (profSplit && profSplit.chars.length) {
                gsap.set(profSplit.chars, { yPercent: 110, opacity: 0 });
            }

            let heroTriggered = false;
            const runHeroTimeline = () => {
                if (heroTriggered) return;
                heroTriggered = true;

                const tl = gsap.timeline({
                    defaults: { ease: 'power3.out' },
                    onComplete: () => {
                        gsap.set('#header, .profile-container, .hero-ticker, .home-status-pill, .home-social-link, #cv, .home-button-secondary', {
                            clearProps: 'transform,scale,opacity'
                        });
                        if (nameSplit && nameSplit.chars.length) {
                            gsap.set(nameSplit.chars, { clearProps: 'transform,rotateZ' });
                        }
                        if (profSplit && profSplit.chars.length) {
                            gsap.set(profSplit.chars, { clearProps: 'transform' });
                        }
                    }
                });

                tl.fromTo('#header', 
                    { y: -30, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.7 }
                )
                .fromTo('.profile-container', 
                    { scale: 0.85, opacity: 0 }, 
                    { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.5)' }, 
                    '-=0.4'
                )
                .fromTo('.home-status-pill',
                    { y: -15, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.55 },
                    '-=0.4'
                );

                if (nameSplit && nameSplit.chars.length) {
                    tl.to(nameSplit.chars, {
                        yPercent: 0,
                        opacity: 1,
                        rotateZ: 0,
                        duration: 0.75,
                        stagger: 0.03,
                        ease: 'power4.out'
                    }, '-=0.5');
                } else if (nameEl) {
                    tl.fromTo(nameEl, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.55');
                }

                if (profSplit && profSplit.chars.length) {
                    tl.to(profSplit.chars, {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.65,
                        stagger: 0.015,
                        ease: 'power4.out'
                    }, '-=0.45');
                } else if (profEl) {
                    tl.fromTo(profEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, '-=0.5');
                }

                tl.fromTo('.home-social-link', 
                    { scale: 0, opacity: 0, y: 15 }, 
                    { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' }, 
                    '-=0.4'
                )
                .fromTo('#cv, .home-button-secondary', 
                    { y: 20, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 
                    '-=0.3'
                )
                .fromTo('.hero-ticker',
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
                    '-=0.25'
                );
            };

            const loader = document.getElementById('loading');
            if (loader && !loader.classList.contains('stop-loading')) {
                window.addEventListener('page-loaded', runHeroTimeline, { once: true });
                setTimeout(runHeroTimeline, 2600);
            } else {
                runHeroTimeline();
            }
        }

        // C. Services Cards Cascade
        const servicesSection = document.querySelector('.services-grid');
        if (servicesSection) {
            const cards = servicesSection.querySelectorAll('.services-card');
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: servicesSection,
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                scale: 0.94,
                stagger: 0.16,
                duration: 0.85,
                ease: 'power3.out'
            });
        }

        // D. Work Projects Grid Reveal
        const workContainer = document.querySelector('.work-container');
        if (workContainer) {
            ScrollTrigger.create({
                trigger: workContainer,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    const visibleCards = Array.from(workContainer.querySelectorAll('.work-card')).filter(c => c.style.display !== 'none');
                    if (visibleCards.length) {
                        gsap.fromTo(visibleCards, 
                            { opacity: 0, y: 30, scale: 0.96 },
                            { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1, 
                                duration: 0.6, 
                                stagger: 0.07, 
                                ease: 'power2.out',
                                clearProps: 'transform,scale'
                            }
                        );
                    }
                }
            });
        }

        // E. Skills Ripple Badges
        const skillsContainer = document.querySelector('.skills-container .list');
        if (skillsContainer) {
            const badges = skillsContainer.querySelectorAll('span');
            gsap.from(badges, {
                scrollTrigger: {
                    trigger: skillsContainer,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                scale: 0.8,
                opacity: 0,
                y: 20,
                stagger: {
                    amount: 0.55,
                    from: 'center'
                },
                duration: 0.6,
                ease: 'back.out(1.6)'
            });
        }

        // F. Testimonials Entrance
        const testimonialsContainer = document.querySelector('.testimonials');
        if (testimonialsContainer) {
            const testimonials = testimonialsContainer.querySelectorAll('.testimonial');
            gsap.from(testimonials, {
                scrollTrigger: {
                    trigger: testimonialsContainer,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            });
        }

        // G. Bento Grid Cards (about.html)
        const bentoGrid = document.querySelector('.bento-grid');
        if (bentoGrid) {
            const bentoBoxes = bentoGrid.querySelectorAll('.bento-box');
            gsap.from(bentoBoxes, {
                scrollTrigger: {
                    trigger: bentoGrid,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 45,
                opacity: 0,
                scale: 0.95,
                stagger: 0.1,
                duration: 0.75,
                ease: 'power3.out'
            });
        }

        // H. Timeline Items (about.html)
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            const items = timeline.querySelectorAll('li');
            gsap.from(items, {
                scrollTrigger: {
                    trigger: timeline,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                x: -35,
                opacity: 0,
                stagger: 0.14,
                duration: 0.75,
                ease: 'power3.out'
            });
        }

        // I. Profile Card (work.html)
        const profileCard = document.querySelector('#profile-cart .profile');
        if (profileCard) {
            gsap.from(profileCard, {
                scrollTrigger: {
                    trigger: '#profile-cart',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                scale: 0.94,
                duration: 0.9,
                ease: 'power3.out'
            });
        }

        // J. Contact Form (contact.html)
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            gsap.from(contactForm, {
                scrollTrigger: {
                    trigger: contactForm,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.85,
                ease: 'power3.out'
            });
        }
    }

    // --------------------------------------------------------------------------
    // 7. Initialization & ScrollTrigger Refresh Management
    // --------------------------------------------------------------------------
    function initAll() {
        initSmoothScroll();
        initCustomCursor();
        initMagneticButtons();
        init3DCardTilt();
        initParallaxEffects();
        initSplitTextTypography();
        initScrollReveals();

        // Refresh triggers on window load and custom life-cycle events to ensure accurate element dimensions
        const refreshTriggers = () => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        };

        window.addEventListener('load', refreshTriggers);
        window.addEventListener('page-loaded', refreshTriggers);
        setTimeout(refreshTriggers, 400);
        setTimeout(refreshTriggers, 1000);

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(refreshTriggers);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();