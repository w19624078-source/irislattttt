document.addEventListener('DOMContentLoaded', () => {

  /* 1. DARK / LIGHT THEME TOGGLE WITH LOCALSTORAGE */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Check system preference or saved preference
  const savedTheme = localStorage.getItem('f1_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else {
    const defaultTheme = systemPrefersDark ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', defaultTheme);
    updateThemeIcon(defaultTheme);
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('f1_portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  /* 2. CUSTOM F1 MOUSE POINTER EFFECT */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorLabel = document.getElementById('cursorLabel');

  if (window.innerWidth >= 992 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth trailing ring animation
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover Effect on Interactive Elements
    const interactiveEls = document.querySelectorAll('a, button, .gallery-item, input, textarea');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
        if (el.classList.contains('gallery-item')) {
          cursorLabel.textContent = 'VIEW';
        } else {
          cursorLabel.textContent = 'RACE';
        }
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
      });
    });

    // Click effect
    window.addEventListener('mousedown', () => document.body.classList.add('clicking'));
    window.addEventListener('mouseup', () => document.body.classList.remove('clicking'));
  }

  /* 3. HEADER SCROLL & ACTIVE LINK NAVIGATION */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Nav Section
    let currentSection = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* 4. MOBILE HAMBURGER MENU */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars-staggered';
    }
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });

  /* 5. GALLERY CATEGORY FILTERING */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* 6. LIGHTBOX FUNCTIONALITY (PIT STOP PREVIEW) */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').getAttribute('src');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      const category = item.getAttribute('data-category');

      lightboxImg.setAttribute('src', imgSrc);
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      lightboxCategory.textContent = category.toUpperCase();

      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  /* 7. SCROLL REVEAL ANIMATION */
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on page load
});