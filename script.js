/* ==================== MOBILE MENU TOGGLE ==================== */

function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('open');
}

function closeMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.remove('open');
}

/* Close menu when clicking outside */
document.addEventListener('click', function(event) {
  const nav = document.querySelector('nav');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  
  if (!nav.contains(event.target) && !mobileMenu.contains(event.target)) {
    closeMenu();
  }
});

/* ==================== NAVIGATION ACTIVE STATE ==================== */

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      closeMenu();
    });
  });
});

/* ==================== SMOOTH SCROLL ==================== */

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 72; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

/* ==================== SCROLL ANIMATIONS ==================== */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply animation to sections
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
});

/* ==================== PROCESS STEPS SCROLL-IN ANIMATION ==================== */

document.addEventListener('DOMContentLoaded', function() {
  const procSteps = document.querySelectorAll('.proc-step');

  const procObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        procObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  procSteps.forEach(step => procObserver.observe(step));
});

/* ==================== NAVBAR BACKGROUND ON SCROLL ==================== */

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');
  
  if (window.scrollY > 10) {
    navbar.style.background = 'rgba(250, 248, 243, 0.98)';
  } else {
    navbar.style.background = 'rgba(250, 248, 243, 0.95)';
  }
});

/* ==================== ACTIVE NAVBAR LINK INDICATOR ==================== */

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
      link.style.color = 'var(--gold)';
    } else {
      link.style.color = 'var(--ink)';
    }
  });
});

/* ==================== LOGO CARD LOADING STATE ==================== */

document.addEventListener('DOMContentLoaded', function() {
  const logoCards = document.querySelectorAll('.logo-card');
  
  logoCards.forEach((card, index) => {
    // Add a slight delay to each card for a staggered effect
    card.style.animationDelay = (index * 0.05) + 's';
    
    // Check if background image loaded
    const bgImage = window.getComputedStyle(card).backgroundImage;
    
    if (bgImage && bgImage !== 'none') {
      const img = new Image();
      img.src = bgImage.slice(5, -2); // Remove url(' and ')
      
      img.onload = function() {
        card.style.opacity = '1';
      };
      
      img.onerror = function() {
        // If image fails to load, show placeholder
        card.style.background = 'linear-gradient(135deg, #f0f0f0, #e0e0e0)';
        card.style.color = '#999';
        card.innerHTML = '<span style="font-size: 0.75rem; text-align: center;">Logo Not Found</span>';
      };
    }
  });
});

/* ==================== COUNTER ANIMATION ==================== */

function animateCounter(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;
  
  const counter = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/* Trigger counter animation when hero section is visible */
window.addEventListener('load', function() {
  const heroStats = document.querySelectorAll('.hero-stat .num');
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numElement = entry.target;
        const text = numElement.textContent;
        const number = parseInt(text);
        
        animateCounter(numElement, number);
        observer.unobserve(numElement);
      }
    });
  });
  
  heroStats.forEach(stat => observer.observe(stat));
});

/* ==================== FORM VALIDATION - IF YOU ADD CONTACT FORM ==================== */

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* ==================== COPY TO CLIPBOARD - FOR CONTACT INFO ==================== */

function copyToClipboard(text, elementId) {
  navigator.clipboard.writeText(text).then(() => {
    const element = document.getElementById(elementId);
    const originalText = element.textContent;
    
    element.textContent = 'Copied!';
    element.style.color = 'var(--gold)';
    
    setTimeout(() => {
      element.textContent = originalText;
      element.style.color = '';
    }, 2000);
  });
}

/* ==================== RESPONSIVE IMAGE CHECK ==================== */

window.addEventListener('resize', function() {
  // Adjust scroll track animation based on viewport width
  const scrollTrack = document.querySelector('.scroll-track');
  
  if (window.innerWidth < 768) {
    scrollTrack.style.animationDuration = '25s';
  } else {
    scrollTrack.style.animationDuration = '35s';
  }
});

// Trigger on load
window.dispatchEvent(new Event('resize'));

/* ==================== PRELOAD FONTS ==================== */

document.addEventListener('DOMContentLoaded', function() {
  const fonts = [
    'Playfair Display:400;700;900',
    'DM Sans:300;400;500;600'
  ];
  
  fonts.forEach(font => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
});

/* ==================== DEBUG MODE - UNCOMMENT TO USE ==================== */

// Uncomment below to enable debug logging
/*
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log('[Image Printers]', ...args);
}

log('Website loaded successfully');
*/
