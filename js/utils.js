/* ===================================
   UTILITIES, HAPTIC & TOAST MODULE
   =================================== */

// Haptic feedback helper
export function triggerHaptic() {
    if ('vibrate' in navigator) {
        try { navigator.vibrate(8); } catch (e) {}
    }
}

// Toast notification helper
export function showToast(message, icon = 'fa-info-circle') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    triggerHaptic();

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize Quick Action FAB Menu & Web Share
export function initUtils() {
    // Remove loading class on page load
    document.body.classList.remove('page-loading');
    
    // Preloader auto-hide (mobile-first: faster hide)
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // For mobile: hide preloader immediately when DOM is ready
        const isMobile = window.innerWidth <= 768;
        const hideDelay = isMobile ? 200 : 500;
        
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), hideDelay);
        });
        
        // Fallback timeout - faster for mobile
        setTimeout(() => preloader.classList.add('hidden'), isMobile ? 800 : 2500);
    }

    // Custom Cursor Desktop Engine
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (window.innerWidth > 768 && cursorDot && cursorOutline) {
        let cursorX = 0, cursorY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = cursorX - 4 + 'px';
            cursorDot.style.top = cursorY - 4 + 'px';
        });

        function animateCursor() {
            outlineX += (cursorX - outlineX) * 0.12;
            outlineY += (cursorY - outlineY) * 0.12;
            cursorOutline.style.left = outlineX - 18 + 'px';
            cursorOutline.style.top = outlineY - 18 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverTargets = document.querySelectorAll('a, button, .gallery-item, .gov-card, .potensi-card, .dusun-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }

    // Mobile Quick Action FAB Menu
    const mobileQuickActions = document.getElementById('mobile-quick-actions');
    const quickActionTrigger = document.getElementById('quick-action-trigger');
    const mobileShareBtn = document.getElementById('mobile-share-btn');

    if (quickActionTrigger && mobileQuickActions) {
        quickActionTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileQuickActions.classList.toggle('open');
            quickActionTrigger.classList.toggle('active');
            triggerHaptic();
        });

        document.addEventListener('click', (e) => {
            if (!mobileQuickActions.contains(e.target)) {
                mobileQuickActions.classList.remove('open');
                quickActionTrigger.classList.remove('active');
            }
        });
    }

    // Web Share API
    if (mobileShareBtn) {
        mobileShareBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            triggerHaptic();
            const shareData = {
                title: 'UMKM Desa Kosongan',
                text: 'Jelajahi produk unggulan dari 8 dusun di Desa Kosongan',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                    showToast('Berhasil dibagikan!', 'fa-check-circle');
                } catch (err) {
                    if (err.name !== 'AbortError') copyShareLink();
                }
            } else {
                copyShareLink();
            }
        });
    }

    function copyShareLink() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast('Tautan tersalin ke papan klip!', 'fa-copy');
            }).catch(() => {
                showToast('Portal UMKM Desa Kosongan', 'fa-link');
            });
        } else {
            showToast('Portal UMKM Desa Kosongan', 'fa-link');
        }
    }

    // Lazy load image fade effect
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => img.style.opacity = '1');
        }
    });

    console.log('%c🏡 UMKM Desa Kosongan - Portal Resmi', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%c✨ Modular JavaScript Engine Loaded', 'color: #f59e0b; font-size: 12px;');
}
