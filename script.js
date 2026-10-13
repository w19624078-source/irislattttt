document.addEventListener('DOMContentLoaded', () => {

  /* 1. DARK / LIGHT THEME TOGGLE */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

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
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }


  /* 2. PAGE TABS SWITCHING LOGIC */
  window.switchPage = function(pageId) {
    const pageMain = document.getElementById('page-main');
    const pageShowcase = document.getElementById('page-showcase');
    const tabMain = document.getElementById('tab-main');
    const tabShowcase = document.getElementById('tab-showcase');

    if (pageId === 'main') {
      pageShowcase.classList.remove('active');
      setTimeout(() => {
        pageShowcase.style.display = 'none';
        pageMain.style.display = 'block';
        setTimeout(() => pageMain.classList.add('active'), 50);
      }, 300);

      tabMain.classList.add('active');
      tabShowcase.classList.remove('active');
    } else if (pageId === 'showcase') {
      pageMain.classList.remove('active');
      setTimeout(() => {
        pageMain.style.display = 'none';
        pageShowcase.style.display = 'block';
        setTimeout(() => pageShowcase.classList.add('active'), 50);
      }, 300);

      tabShowcase.classList.add('active');
      tabMain.classList.remove('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.handleContactClick = function(event) {
    event.preventDefault();
    const pageMain = document.getElementById('page-main');
    if (!pageMain.classList.contains('active')) {
      switchPage('main');
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  };


  /* 3. MAX VERSTAPPEN #1 F1 CAR CURSOR WITH SLATE BLUE (#6674A3) TIRE TRAIL */
  const cursorCar = document.getElementById('cursorCar');
  const canvas = document.getElementById('trailCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  if (ctx && window.innerWidth >= 992 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let carX = mouseX;
    let carY = mouseY;
    let angle = 0;

    let skidTrails = [];
    let smokeParticles = [];

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animatePhysics() {
      const dx = mouseX - carX;
      const dy = mouseY - carY;
      const dist = Math.hypot(dx, dy);

      carX += dx * 0.18;
      carY += dy * 0.18;

      if (dist > 2) {
        const targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
        
        let angleDiff = targetAngle - angle;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        angle += angleDiff * 0.25;

        const rearWheelOffset = 25;
        const wheelSeparation = 14;

        const rearX = carX - Math.sin(angle) * rearWheelOffset;
        const rearY = carY + Math.cos(angle) * rearWheelOffset;

        const leftWheelX = rearX - Math.cos(angle) * (wheelSeparation / 2);
        const leftWheelY = rearY - Math.sin(angle) * (wheelSeparation / 2);

        const rightWheelX = rearX + Math.cos(angle) * (wheelSeparation / 2);
        const rightWheelY = rearY + Math.sin(angle) * (wheelSeparation / 2);

        skidTrails.push({ x: leftWheelX, y: leftWheelY, alpha: 0.4, size: 2.5 });
        skidTrails.push({ x: rightWheelX, y: rightWheelY, alpha: 0.4, size: 2.5 });

        if (dist > 8 && Math.random() < 0.6) {
          smokeParticles.push({
            x: rearX + (Math.random() - 0.5) * 8,
            y: rearY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: Math.random() * 5 + 3,
            alpha: 0.35
          });
        }
      }

      cursorCar.style.left = `${carX}px`;
      cursorCar.style.top = `${carY}px`;
      cursorCar.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trailColorVar = getComputedStyle(document.documentElement).getPropertyValue('--trail-color').trim() || '#6674A3';

      for (let i = 0; i < skidTrails.length; i++) {
        const p = skidTrails[i];
        ctx.fillStyle = trailColorVar.startsWith('#') && trailColorVar.length === 7 
          ? `rgba(${parseInt(trailColorVar.slice(1,3),16)}, ${parseInt(trailColorVar.slice(3,5),16)}, ${parseInt(trailColorVar.slice(5,7),16)}, ${p.alpha})`
          : `rgba(102, 116, 163, ${p.alpha})`;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.alpha -= 0.005;
      }
      skidTrails = skidTrails.filter(p => p.alpha > 0);

      for (let i = 0; i < smokeParticles.length; i++) {
        const sp = smokeParticles[i];
        ctx.fillStyle = `rgba(102, 116, 163, ${sp.alpha})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fill();

        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.radius += 0.2;
        sp.alpha -= 0.015;
      }
      smokeParticles = smokeParticles.filter(sp => sp.alpha > 0);

      requestAnimationFrame(animatePhysics);
    }

    animatePhysics();

    const hoverTargets = document.querySelectorAll('a, button, .showcase-card, .hero-art-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }


  /* 4. HEADER SCROLL EFFECT */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* 5. MOBILE HAMBURGER MENU */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.className = navMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
  });


  /* 6. LIGHTBOX FUNCTIONALITY */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  window.openLightbox = function(imgSrc, title, desc) {
    lightboxImg.setAttribute('src', imgSrc);
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightbox.classList.add('active');
  };

  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });


  /* 7. SCROLL REVEAL ANIMATIONS */
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});