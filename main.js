/* =====================================================
   DEVIKA E S - MECHANICAL DESIGN ENGINEER PORTFOLIO
   Professional Interactive JavaScript
   ===================================================== */

// ========== PAGE LOAD INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio Loading...');
    
    initializeSkillBars();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeProjectCards();
    initializeCountUpAnimations();
    initializeNavigation();
    addScrollProgress();
    
    console.log('✅ Portfolio Ready!');
});

// ========== SKILL BARS ANIMATION ==========
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || bar.style.width;
                
                // Animate the skill fill
                setTimeout(() => {
                    bar.style.animation = `none`;
                    setTimeout(() => {
                        bar.style.animation = `fillSkill 1.5s ease-out forwards`;
                        bar.style.setProperty('--skill-width', width);
                    }, 10);
                }, 0);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => {
        // Set initial width from parent's style or default
        const parent = bar.parentElement;
        const computedStyle = window.getComputedStyle(bar);
        const width = computedStyle.width || '0%';
        bar.setAttribute('data-width', width);
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// ========== SCROLL REVEAL ANIMATIONS ==========
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('section, .experience-item, .skill-category, .project-card, .cert-card, .education-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ========== SMOOTH SCROLL ==========
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== PROJECT CARD INTERACTIONS ==========
function initializeProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// ========== COUNT UP ANIMATIONS ==========
function initializeCountUpAnimations() {
    const counters = document.querySelectorAll('.year-counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
                const start = parseInt(counter.textContent.match(/\d+/)?.[0]) || 0;
                
                animateCounter(counter, start, target, 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ========== NAVIGATION HIGHLIGHT ==========
function initializeNavigation() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav item if you have navigation
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========== SCROLL PROGRESS BAR ==========
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d98e 0%, #00e5a0 100%);
        width: 0%;
        z-index: 999;
        box-shadow: 0 0 10px rgba(0, 217, 142, 0.6);
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

// ========== BUTTON RIPPLE EFFECT ==========
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ========== DYNAMIC SKILL BARS (If using data attributes) ==========
function updateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const percentage = item.getAttribute('data-percentage');
        if (percentage) {
            const skillFill = item.querySelector('.skill-fill');
            if (skillFill) {
                skillFill.setAttribute('data-width', percentage + '%');
            }
        }
    });
}

// ========== THEME TOGGLE (Optional Dark/Light Mode) ==========
function initializeThemeToggle() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        document.body.style.filter = 'invert(0)';
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches) {
            console.log('System theme changed to dark');
        } else {
            console.log('System theme changed to light');
        }
    });
}

// ========== LAZY LOAD IMAGES ==========
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    // Ctrl + K or Cmd + K to focus search/scroll to top
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Home key to scroll to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // End key to scroll to bottom
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
});

// ========== PERFORMANCE MONITORING ==========
function logPerformanceMetrics() {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('📊 Performance Metrics:');
        console.log(`   Page Load Time: ${pageLoadTime}ms`);
        console.log(`   Connect Time: ${connectTime}ms`);
        console.log(`   Render Time: ${renderTime}ms`);
    });
}

// ========== CONTACT FORM VALIDATION (if you add a form) ==========
function validateContactForm(formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,}$/;
    
    if (!emailRegex.test(formData.email)) {
        return { valid: false, message: 'Please enter a valid email' };
    }
    
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        return { valid: false, message: 'Please enter a valid phone number' };
    }
    
    return { valid: true, message: 'Form is valid' };
}

// ========== EXTERNAL LINK HANDLING ==========
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Opening external link:', this.href);
        // Optional: Add tracking or other behavior
    });
});

// ========== DOCUMENT READY LOG ==========
console.log('%c🎯 Devika E S - Mechanical Design Engineer Portfolio', 
    'font-size: 16px; color: #00d98e; font-weight: bold; text-shadow: 0 0 10px rgba(0,217,142,0.5)');
console.log('%cProfessional Portfolio with Advanced Interactivity', 
    'font-size: 12px; color: #b0b0cc;');

// Initialize everything on load
window.addEventListener('load', function() {
    addRippleEffect();
    initializeThemeToggle();
    initializeLazyLoading();
    logPerformanceMetrics();
});