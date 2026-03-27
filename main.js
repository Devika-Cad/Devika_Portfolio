/* =========================================
   DEVIKA E S — PORTFOLIO JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. SCROLL REVEAL ----
  // Animates elements with class .reveal when they enter the viewport
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ---- 2. SKILL BAR ANIMATION ----
  // Fills skill bars with their defined --w CSS variable when scrolled into view
  const bars = document.querySelectorAll('.skill-bar__fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.style.getPropertyValue('--w') ||
                      getComputedStyle(target).getPropertyValue('--w');
        target.style.width = width;
        target.classList.add('animate');
        barObserver.unobserve(target);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(bar => barObserver.observe(bar));


  // ---- 3. ACTIVE NAV HIGHLIGHT (optional nav) ----
  // If a nav is added later, this highlights the active section link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (navLinks.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
  }


  // ---- 4. SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ---- 5. CURSOR GLOW EFFECT ----
  // Subtle golden glow that follows the cursor
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });


  // ---- 6. HERO NAME LETTER HOVER SPLIT ----
  // Splits hero name spans into individual letters for hover effects
  document.querySelectorAll('.hero__name span').forEach(span => {
    const text = span.textContent.trim();
    span.innerHTML = text.split('').map(char =>
      char === ' '
        ? ' '
        : `<span class="letter" style="display:inline-block; transition: color 0.2s, transform 0.2s;">${char}</span>`
    ).join('');

    span.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('letter')) {
        e.target.style.color = 'var(--accent)';
        e.target.style.transform = 'translateY(-4px)';
      }
    });

    span.addEventListener('mouseout', (e) => {
      if (e.target.classList.contains('letter')) {
        e.target.style.color = '';
        e.target.style.transform = '';
      }
    });
  });


  // ---- 7. CERT CARD TILT EFFECT ----
  // Subtle 3D tilt on certification cards on mouse move
  document.querySelectorAll('.cert__card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ---- 8. SCROLL PROGRESS BAR ----
  // Thin gold bar at the top of the page showing scroll progress
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: var(--accent);
    z-index: 10000;
    transition: width 0.1s linear;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
  });


  // ---- 9. YEAR RANGE COUNT-UP ANIMATION ----
  // Counts up end year inside .edu__year when scrolled into view
  // Handles both single years (e.g., "2025") and year ranges (e.g., "2021 — 2025")
  document.querySelectorAll('.edu__year').forEach(el => {
    const text = el.textContent.trim();
    
    // Extract the final year (handles both "2025" and "2021 — 2025")
    const yearMatch = text.match(/\d{4}(?=\D*$)/);
    if (!yearMatch) return;
    
    const finalYear = parseInt(yearMatch[0]);
    const startYear = finalYear - 4;
    const prefix = text.substring(0, text.lastIndexOf(finalYear));
    let currentYear = startYear;
    let started = false;

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          
          const animateYear = () => {
            el.textContent = prefix + currentYear;
            if (currentYear < finalYear) {
              currentYear++;
              setTimeout(animateYear, 80);
            }
          };
          
          animateYear();
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countObserver.observe(el);
  });

});