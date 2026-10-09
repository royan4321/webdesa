/* ===================================
   GALLERY & LIGHTBOX MODULE
   =================================== */

import { triggerHaptic } from './utils.js';

export function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // Gallery Category Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            galleryItems.forEach((item, index) => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.animation = 'none';
                    item.offsetHeight;
                    item.classList.remove('hidden');
                    item.style.animation = `fadeInUp 0.5s ease ${index * 0.08}s both`;
                } else {
                    item.classList.add('hidden');
                }
            });
            triggerHaptic();
        });
    });

    // Lightbox Functionality
    let currentGalleryIndex = 0;
    const galleryItemArray = Array.from(galleryItems);

    function updateLightboxImage(index) {
        if (index < 0) index = galleryItemArray.length - 1;
        if (index >= galleryItemArray.length) index = 0;
        currentGalleryIndex = index;

        const currentItem = galleryItemArray[currentGalleryIndex];
        const img = currentItem.querySelector('img');
        const info = currentItem.querySelector('.gallery-info h4');

        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Desa Kragilan';
        }
        if (lightboxCaption && info) {
            lightboxCaption.textContent = info.textContent;
        }
    }

    galleryItemArray.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentGalleryIndex = index;
            updateLightboxImage(index);
            if (lightbox) {
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
            triggerHaptic();
        });
    });

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxImage(currentGalleryIndex - 1);
            triggerHaptic();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            updateLightboxImage(currentGalleryIndex + 1);
            triggerHaptic();
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') updateLightboxImage(currentGalleryIndex - 1);
        if (e.key === 'ArrowRight') updateLightboxImage(currentGalleryIndex + 1);
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        triggerHaptic();
    }

    // Touch Swipe Gestures for Lightbox
    if (lightbox) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 40;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX < -minSwipeDistance) {
                    updateLightboxImage(currentGalleryIndex + 1);
                    triggerHaptic();
                } else if (deltaX > minSwipeDistance) {
                    updateLightboxImage(currentGalleryIndex - 1);
                    triggerHaptic();
                }
            } else {
                if (deltaY > minSwipeDistance + 20) {
                    closeLightbox();
                }
            }
        }
    }
}
