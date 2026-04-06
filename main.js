/* ═══════════════════════════════════════════════════════
   DAYMAY — Premium Interactive Script
   Asador Pizzería Daymay · Horche, Guadalajara
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ───────────── Scroll Reveal Setup ───────────── */
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // If the element is a line, we can add a specific class if needed
          if (entry.target.classList.contains('section-line')) {
            entry.target.classList.add('visible-line');
          }
          
          // Once animated, no need to observe again
          revealObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Also observe section lines specifically if they aren't part of a reveal block
    document.querySelectorAll('.section-line').forEach(line => revealObserver.observe(line));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ───────────── Navbar Scroll Effect ───────────── */
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load

  /* ───────────── Mobile Menu Toggle ───────────── */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuSpans = menuBtn ? menuBtn.querySelectorAll('span') : [];
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileMenu = () => {
    const isVisible = !mobileMenu.classList.contains('invisible');
    
    if (isVisible) {
      // Close menu
      mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-4');
      mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      
      // Reset Menu Icon
      menuSpans[0].classList.remove('rotate-45', 'translate-y-2');
      menuSpans[1].classList.remove('opacity-0');
      menuSpans[2].classList.remove('-rotate-45', '-translate-y-2', 'w-7');
      menuSpans[2].classList.add('w-5');
    } else {
      // Open menu
      mobileMenu.classList.remove('opacity-0', 'invisible', '-translate-y-4');
      mobileMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
      
      // Animate Icon to X
      menuSpans[0].classList.add('rotate-45', 'translate-y-2');
      menuSpans[1].classList.add('opacity-0');
      menuSpans[2].classList.add('-rotate-45', '-translate-y-2', 'w-7');
      menuSpans[2].classList.remove('w-5');
    }
  };

  if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close menu when clicking links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('invisible')) {
        toggleMobileMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.classList.contains('invisible') && !mobileMenu.contains(e.target) && e.target !== menuBtn) {
      toggleMobileMenu();
    }
  });

  /* ───────────── Ember Particle System ───────────── */
  const emberContainer = document.getElementById('ember-container');
  
  if (emberContainer) {
    const createEmber = () => {
      const ember = document.createElement('div');
      ember.classList.add('ember');
      
      // Randomize position and animation properties
      const startX = Math.random() * 100;
      const startY = 100 + (Math.random() * 20); // Start below the hero
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 5;
      const size = 2 + Math.random() * 4;
      
      ember.style.left = `${startX}%`;
      ember.style.bottom = `-20px`; // Starting just below the bottom
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      ember.style.animationDuration = `${duration}s`;
      ember.style.animationDelay = `${delay}s`;
      
      emberContainer.appendChild(ember);
      
      // Remove ember after animation finishes
      setTimeout(() => {
        ember.remove();
      }, (duration + delay) * 1000);
    };

    // Initial burst of embers
    for(let i = 0; i < 20; i++) {
      createEmber();
    }

    // Continuous generation
    setInterval(createEmber, 400);
  }

  /* ───────────── Smooth Scroll Override (Optional improvement) ───────────── */
  // The CSS scroll-smooth already handles basic anchor links.
  // We can add logic here if we wanted custom offsets or easing.
});
