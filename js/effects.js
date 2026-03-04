/**
 * Fair Go Justice - Modern Interactive Effects
 * Scroll reveals, 3D card tilt, parallax, particle grid, typed text
 */

(function() {
  'use strict';

  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================

  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Don't unobserve - keep observing for re-entry if needed
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // 3D Card Tilt Effect
  // ==========================================================================

  function initCardTilt() {
    const cards = document.querySelectorAll('.card-3d');

    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        this.style.transition = 'transform 0.5s ease';
      });

      card.addEventListener('mouseenter', function() {
        this.style.transition = 'none';
      });
    });
  }

  // ==========================================================================
  // Parallax Background Effect
  // ==========================================================================

  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    if (!parallaxElements.length) return;

    let ticking = false;

    function updateParallax() {
      const scrollY = window.pageYOffset;

      parallaxElements.forEach(el => {
        const parent = el.closest('.parallax-section');
        if (!parent) return;

        const parentRect = parent.getBoundingClientRect();
        const speed = parseFloat(el.dataset.speed) || 0.3;
        
        if (parentRect.top < window.innerHeight && parentRect.bottom > 0) {
          const yPos = -(parentRect.top * speed);
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // ==========================================================================
  // Header Glassmorphism on Scroll
  // ==========================================================================

  function initHeaderGlass() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    header.classList.add('header-glass');

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ==========================================================================
  // Typed Text Effect
  // ==========================================================================

  class TypedText {
    constructor(element, options = {}) {
      this.element = element;
      this.strings = options.strings || [element.textContent];
      this.typeSpeed = options.typeSpeed || 50;
      this.backSpeed = options.backSpeed || 30;
      this.backDelay = options.backDelay || 2000;
      this.loop = options.loop !== undefined ? options.loop : true;
      this.currentString = 0;
      this.currentChar = 0;
      this.isDeleting = false;

      this.element.textContent = '';
      this.type();
    }

    type() {
      const current = this.strings[this.currentString];
      
      if (this.isDeleting) {
        this.element.textContent = current.substring(0, this.currentChar - 1);
        this.currentChar--;
      } else {
        this.element.textContent = current.substring(0, this.currentChar + 1);
        this.currentChar++;
      }

      let delay = this.isDeleting ? this.backSpeed : this.typeSpeed;

      if (!this.isDeleting && this.currentChar === current.length) {
        delay = this.backDelay;
        if (this.loop || this.currentString < this.strings.length - 1) {
          this.isDeleting = true;
        } else {
          return; // Stop if not looping and on last string
        }
      } else if (this.isDeleting && this.currentChar === 0) {
        this.isDeleting = false;
        this.currentString = (this.currentString + 1) % this.strings.length;
        delay = 500;
      }

      setTimeout(() => this.type(), delay);
    }
  }

  function initTypedText() {
    const typedElements = document.querySelectorAll('[data-typed]');
    
    typedElements.forEach(el => {
      const strings = el.dataset.typed.split('|');
      
      // Only start when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            new TypedText(el, {
              strings: strings,
              typeSpeed: 60,
              backSpeed: 40,
              backDelay: 3000
            });
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  }

  // ==========================================================================
  // Particle Dot Grid (Canvas Background)
  // ==========================================================================

  function initParticleGrid() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    function resize() {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      createParticles();
    }

    function createParticles() {
      particles = [];
      const spacing = 60;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            baseX: i * spacing + spacing / 2,
            baseY: j * spacing + spacing / 2,
            size: 1.5,
            opacity: 0.3
          });
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // React to mouse
        const dx = mouseX - p.baseX;
        const dy = mouseY - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x = p.baseX - dx * force * 0.3;
          p.y = p.baseY - dy * force * 0.3;
          p.opacity = 0.3 + force * 0.5;
          p.size = 1.5 + force * 2;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          p.opacity += (0.3 - p.opacity) * 0.1;
          p.size += (1.5 - p.size) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80 && (p1.opacity > 0.4 || p2.opacity > 0.4)) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(p1.opacity, p2.opacity) * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }

    canvas.addEventListener('mousemove', function(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', function() {
      mouseX = -1000;
      mouseY = -1000;
    });

    window.addEventListener('resize', resize);
    resize();
    animate();
  }

  // ==========================================================================
  // Smooth Counter Animation (Enhanced)
  // ==========================================================================

  function initModernCounters() {
    const counters = document.querySelectorAll('.counter-modern');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target || counter.textContent.replace(/,/g, ''));
          const prefix = counter.dataset.prefix || '';
          const suffix = counter.dataset.suffix || '';
          
          if (!isNaN(target)) {
            animateCounter(counter, 0, target, 2000, prefix, suffix);
          }
          
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(element, start, end, duration, prefix, suffix) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      element.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ==========================================================================
  // Mouse Follow Gradient (Hero)
  // ==========================================================================

  function initMouseGradient() {
    const hero = document.querySelector('.hero-modern');
    if (!hero) return;

    hero.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      this.style.setProperty('--mouse-x', x + '%');
      this.style.setProperty('--mouse-y', y + '%');
    });
  }

  // ==========================================================================
  // Smooth Page Load Animation
  // ==========================================================================

  function initPageLoad() {
    document.body.classList.add('page-loaded');
  }

  // ==========================================================================
  // Image Lazy Load with Fade
  // ==========================================================================

  function initModernLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease';
          
          img.onload = function() {
            img.style.opacity = '1';
          };
          
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));
  }

  // ==========================================================================
  // Initialize All Effects
  // ==========================================================================

  function init() {
    initScrollReveal();
    initCardTilt();
    initParallax();
    initHeaderGlass();
    initTypedText();
    initParticleGrid();
    initModernCounters();
    initMouseGradient();
    initModernLazyLoad();
    
    // Page load animation
    requestAnimationFrame(() => {
      requestAnimationFrame(initPageLoad);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
