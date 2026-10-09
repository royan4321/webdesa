/* ===================================
   NAVIGATION & ACTIVE LINKS MODULE
   =================================== */

export function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');

    // Cache section positions to prevent layout thrashing (forced reflow) on scroll
    let cachedSections = [];
    function cacheSectionPositions() {
        cachedSections = Array.from(sections).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop,
            height: section.offsetHeight
        }));
    }
    cacheSectionPositions();
    window.addEventListener('resize', cacheSectionPositions, { passive: true });

    // Header scroll background toggle, hide on scroll down, and active section tracking
    let lastScrollY = 0;
    let ticking = false;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Header background & hide/show logic
        if (currentScrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScrollY > 500 && backToTop) {
            backToTop.classList.add('visible');
        } else if (backToTop) {
            backToTop.classList.remove('visible');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;

        // Active Section Tracking using cached positions
        const scrollPos = currentScrollY + 200;
        for (let i = 0; i < cachedSections.length; i++) {
            const sec = cachedSections[i];
            if (scrollPos >= sec.top && scrollPos < sec.top + sec.height) {
                navLinks.forEach(link => {
                    if (link.getAttribute('data-section') === sec.id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                mobileNavItems.forEach(item => {
                    if (item.getAttribute('data-section') === sec.id) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
                break;
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Hamburger Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Anchor Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = (navbar ? navbar.offsetHeight : 0) + 15;
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle back link on detail pages (mobile-optimized: instant navigation)
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            const href = backLink.getAttribute('href');
            
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Mobile: instant navigation without animation
                window.location.href = href;
            } else {
                // Desktop: smooth fade out animation
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    }
}

