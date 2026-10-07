/* ===================================
   DESA KOSONGAN - MAIN JAVASCRIPT ENTRY
   =================================== */

import { initParticles } from './js/particles.js';
import { initNavigation } from './js/navigation.js';
import { initAnimations } from './js/animations.js';
import { initGallery } from './js/gallery.js';
import { initUtils } from './js/utils.js';
import { initDusunNavigation } from './js/dusun.js';

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initAnimations();
    initGallery();
    initUtils();
    initDusunNavigation();
});
