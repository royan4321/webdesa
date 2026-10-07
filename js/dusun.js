/* ===================================
   DUSUN NAVIGATION HANDLER
   =================================== */

export function initDusunNavigation() {
    const dusunCards = document.querySelectorAll('.dusun-card');
    
    // If no dusun cards found (not on main page), skip
    if (!dusunCards || dusunCards.length === 0) {
        return;
    }
    
    // Mapping dusun data-attribute ke halaman HTML
    const dusunPages = {
        'brajan': 'dusun-brajan.html',
        'dalangan': 'dusun-dalangan.html',
        'dokerso': 'dusun-dokerso.html',
        'kenangkan': 'dusun-kenangkan.html',
        'kragilan': 'dusun-kragilan.html',
        'kwalikan': 'dusun-kwalikan.html',
        'mranggen': 'dusun-mranggen.html',
        'pangkatan': 'dusun-pangkatan.html'
    };

    dusunCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const dusunName = card.dataset.dusun;
            const targetPage = dusunPages[dusunName];
            
            if (targetPage) {
                // Prevent multiple clicks
                if (card.classList.contains('is-transitioning')) return;
                card.classList.add('is-transitioning');

                const isMobile = window.innerWidth <= 768;
                
                if (isMobile) {
                    // Mobile: simple fast transition (no complex animations)
                    card.style.transform = 'scale(0.95)';
                    card.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        window.location.href = targetPage;
                    }, 200);
                } else {
                    // Desktop: full animation experience
                    const rect = card.getBoundingClientRect();
                    const cardImage = card.querySelector('.dusun-image img');
                    const cardTitle = card.querySelector('.dusun-content h3').textContent;

                    // Create full-screen transition overlay
                    createTransitionOverlay(rect, cardImage, cardTitle, targetPage);

                    // Add explosion effect to clicked card
                    createExplosionEffect(card);

                    // Animate other cards out
                    animateOtherCards(card);
                }
            }
        });

        // Add magnetic hover effect (desktop only)
        if (window.innerWidth > 768) {
            card.addEventListener('mousemove', (e) => {
                if (card.classList.contains('is-transitioning')) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateY(${deltaX * 5}deg) 
                    rotateX(${-deltaY * 5}deg) 
                    translateZ(10px)
                    scale(1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('is-transitioning')) return;
                card.style.transform = '';
            });
        }
    });
}

function createTransitionOverlay(rect, cardImage, cardTitle, targetPage) {
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    // Clone and animate the card image
    const imageClone = cardImage.cloneNode(true);
    imageClone.className = 'transition-image';
    imageClone.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        object-fit: cover;
        border-radius: 20px;
        z-index: 10002;
        transition: none;
    `;
    document.body.appendChild(imageClone);

    // Create particle burst
    createParticleBurst(rect);

    // Create ripple effect
    createRippleEffect(rect);

    // Animate overlay fade in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        
        // Expand image to fullscreen
        setTimeout(() => {
            imageClone.style.transition = 'all 0.8s cubic-bezier(0.76, 0, 0.24, 1)';
            imageClone.style.top = '0';
            imageClone.style.left = '0';
            imageClone.style.width = '100vw';
            imageClone.style.height = '100vh';
            imageClone.style.borderRadius = '0';
            imageClone.style.filter = 'brightness(0.4)';
        }, 50);
    });

    // Show loading animation
    setTimeout(() => {
        createLoadingAnimation(cardTitle);
    }, 400);

    // Navigate after animation
    setTimeout(() => {
        window.location.href = targetPage;
    }, 1500);
}

function createExplosionEffect(card) {
    const particles = 30;
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.cssText = `
            position: fixed;
            top: ${rect.top + rect.height / 2}px;
            left: ${rect.left + rect.width / 2}px;
            width: ${4 + Math.random() * 8}px;
            height: ${4 + Math.random() * 8}px;
            background: linear-gradient(135deg, #10b981, #f59e0b);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            animation: explode 1s ease-out forwards;
            --tx: ${tx}px;
            --ty: ${ty}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }

    // Add CSS for explosion
    if (!document.getElementById('explosion-style')) {
        const style = document.createElement('style');
        style.id = 'explosion-style';
        style.textContent = `
            @keyframes explode {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--tx), var(--ty)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createParticleBurst(rect) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            top: ${centerY}px;
            left: ${centerX}px;
            width: 3px;
            height: 3px;
            background: ${Math.random() > 0.5 ? '#10b981' : '#f59e0b'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            opacity: 1;
            box-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

function createRippleEffect(rect) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        top: ${rect.top + rect.height / 2}px;
        left: ${rect.left + rect.width / 2}px;
        width: 20px;
        height: 20px;
        border: 3px solid #10b981;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(ripple);
    
    ripple.animate([
        { width: '20px', height: '20px', opacity: 1, borderWidth: '3px' },
        { width: '400px', height: '400px', opacity: 0, borderWidth: '0px' }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => ripple.remove();
    
    // Second ripple
    setTimeout(() => {
        const ripple2 = ripple.cloneNode(true);
        document.body.appendChild(ripple2);
        ripple2.animate([
            { width: '20px', height: '20px', opacity: 0.7, borderWidth: '2px' },
            { width: '500px', height: '500px', opacity: 0, borderWidth: '0px' }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => ripple2.remove();
    }, 150);
}

function createLoadingAnimation(title) {
    const loader = document.createElement('div');
    loader.className = 'transition-loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <h2 class="loader-text">Memuat ${title}</h2>
        <div class="loader-progress">
            <div class="loader-progress-bar"></div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Animate progress bar
    const progressBar = loader.querySelector('.loader-progress-bar');
    progressBar.animate([
        { width: '0%' },
        { width: '100%' }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        fill: 'forwards'
    });
}

function animateOtherCards(clickedCard) {
    const allCards = document.querySelectorAll('.dusun-card');
    
    allCards.forEach((card, index) => {
        if (card === clickedCard) {
            // Clicked card zooms and fades
            card.style.transition = 'all 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
            card.style.transform = 'scale(1.1)';
            card.style.opacity = '0';
        } else {
            // Other cards scatter away
            const rect = card.getBoundingClientRect();
            const clickedRect = clickedCard.getBoundingClientRect();
            
            const deltaX = rect.left - clickedRect.left;
            const deltaY = rect.top - clickedRect.top;
            
            const angle = Math.atan2(deltaY, deltaX);
            const distance = 500;
            
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            card.style.transition = `all 0.8s cubic-bezier(0.76, 0, 0.24, 1) ${index * 0.03}s`;
            card.style.transform = `translate(${tx}px, ${ty}px) scale(0.5) rotate(${Math.random() * 360}deg)`;
            card.style.opacity = '0';
        }
    });
}
