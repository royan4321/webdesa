/* ===================================
   SCROLL ANIMATIONS & REVEAL ENGINE
   =================================== */

export function initAnimations() {
    // Top Scroll Progress Bar
    const scrollProgressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0 && scrollProgressBar) {
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgressBar.style.width = progress + '%';
        }
    });

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll(
        '.reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .reveal-flip, .section-header, .section-line'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                const line = entry.target.querySelector('.section-line');
                if (line) line.classList.add('revealed');
            } else {
                const rect = entry.target.getBoundingClientRect();
                if (rect.top > window.innerHeight || rect.bottom < 0) {
                    entry.target.classList.remove('revealed');
                    const line = entry.target.querySelector('.section-line');
                    if (line) line.classList.remove('revealed');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Dynamic Parallax on Scroll (disabled for cards to prevent overlap)
    const parallaxItems = document.querySelectorAll('.about-image-float');
    window.addEventListener('scroll', () => {
        parallaxItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.03;
                const yPos = (window.innerHeight / 2 - rect.top) * speed;
                item.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Counter Numbers Animation
    const counters = document.querySelectorAll('[data-target]');
    let countersAnimated = new Set();

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated.has(entry.target)) {
                countersAnimated.add(entry.target);
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(eased * target);

            element.textContent = currentValue.toLocaleString('id-ID');

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target.toLocaleString('id-ID');
            }
        }

        requestAnimationFrame(updateCount);
    }

    // Text Scramble Effect
    const sectionTags = document.querySelectorAll('.section-tag span');
    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrambleText(entry.target);
                tagObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTags.forEach(tag => tagObserver.observe(tag));

    function scrambleText(element) {
        const originalText = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let iterations = 0;

        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= originalText.length) clearInterval(interval);
            iterations += 1 / 2;
        }, 30);
    }

    // Desktop 3D Tilt Card Effect
    if (window.innerWidth > 1024) {
        const tiltCards = document.querySelectorAll('.gov-card, .potensi-card, .stats-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}
