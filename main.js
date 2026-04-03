document.addEventListener('DOMContentLoaded', () => {
  /* ───────────── Scroll Reveal Object ───────────── */
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerObj) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerObj.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for very old browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ───────────── Navbar Scroll Effect ───────────── */
  const navbar = document.getElementById('navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-charcoal/95', 'backdrop-blur-md', 'shadow-2xl', 'py-3');
        navbar.classList.remove('bg-transparent', 'py-5');
      } else {
        navbar.classList.add('bg-transparent', 'py-5');
        navbar.classList.remove('bg-charcoal/95', 'backdrop-blur-md', 'shadow-2xl', 'py-3');
      }
    });
  }

  /* ───────────── Mobile Menu Toggle ───────────── */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const spans = menuBtn ? menuBtn.querySelectorAll('span') : [];
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function toggleMenu() {
    if (!mobileMenu || !menuBtn) return;
    
    const isOpen = mobileMenu.classList.contains('max-h-80');
    
    if (isOpen) {
      // Close menu
      mobileMenu.classList.remove('max-h-80', 'opacity-100');
      mobileMenu.classList.add('max-h-0', 'opacity-0');
      
      // Animate hamburger back to normal
      spans[0].classList.remove('rotate-45', 'translate-y-2');
      spans[1].classList.remove('opacity-0');
      spans[2].classList.remove('-rotate-45', '-translate-y-2');
    } else {
      // Open menu
      mobileMenu.classList.remove('max-h-0', 'opacity-0');
      mobileMenu.classList.add('max-h-80', 'opacity-100');
      
      // Animate hamburger to X
      spans[0].classList.add('rotate-45', 'translate-y-2');
      spans[1].classList.add('opacity-0');
      spans[2].classList.add('-rotate-45', '-translate-y-2');
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('max-h-80')) {
        toggleMenu();
      }
    });
  });
});
