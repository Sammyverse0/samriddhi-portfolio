/* ==========================================================================
   Samriddhi - Unity 3D Game Developer Portfolio Interactive Scripts
   Features:
   - Interactive 3D Vector Particle Background Canvas
   - 3D Card Tilt Effects & Intersection Observer Animations
   - Form Submission Handling & Feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBgCanvas();
  initNavbar();
  initTiltEffects();
  initScrollAnimations();
  initContactForm();
});

/* ==========================================================================
   1. Interactive 3D Vector Particle Background Canvas
   ========================================================================== */
function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // Create 3D floating nodes
  const particleCount = Math.min(Math.floor(window.innerWidth / 16), 70);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 1000 + 100,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#8E1616' : '#D84040',
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      vz: (Math.random() - 0.5) * 0.8
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse position
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    const fov = 400;
    const cx = width / 2 + (mouse.x - width / 2) * 0.08;
    const cy = height / 2 + (mouse.y - height / 2) * 0.08;

    // Draw connecting vectors for close 3D nodes
    const projected = [];

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Wrap bounds
      if (p.x < -width) p.x = width;
      if (p.x > width) p.x = -width;
      if (p.y < -height) p.y = height;
      if (p.y > height) p.y = -height;
      if (p.z < 100) p.z = 1000;
      if (p.z > 1000) p.z = 100;

      const scale = fov / p.z;
      const projX = p.x * scale + cx;
      const projY = p.y * scale + cy;

      projected.push({ x: projX, y: projY, scale: scale, color: p.color });

      // Draw particle dot
      const alpha = Math.min(1, Math.max(0.1, (1000 - p.z) / 900));
      ctx.beginPath();
      ctx.arc(projX, projY, Math.max(1, p.size * scale), 0, Math.PI * 2);
      ctx.fillStyle = p.color === '#8E1616' ? `rgba(142, 22, 22, ${alpha * 0.8})` : `rgba(216, 64, 64, ${alpha})`;
      ctx.shadowBlur = p.color === '#D84040' ? 8 : 0;
      ctx.shadowColor = '#D84040';
      ctx.fill();
    }

    // Connect close points with neon line segments
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.25;
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.strokeStyle = `rgba(216, 64, 64, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Navbar Scroll & Mobile Menu Toggle
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active navigation highlight
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
}

/* ==========================================================================
   3. 3D Tilt Effect on Hover for Cards
   ========================================================================== */
function initTiltEffects() {
  const cards = document.querySelectorAll('.project-card, .cp-card, .unity-tech-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* ==========================================================================
   4. Scroll Reveal & Skill Progress Animations
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // Animate skill bar fill
        if (entry.target.classList.contains('skills-section')) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-level');
            fill.style.width = targetWidth;
          });
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .project-card, .cp-card').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   5. Contact Form Logic & Interactive Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Transmitted!';
      btn.style.background = 'linear-gradient(135deg, #00B862, #00FF88)';

      if (formStatus) {
        formStatus.innerHTML = '<div style="margin-top: 15px; padding: 12px; background: rgba(0, 255, 136, 0.15); border: 1px solid #00FF88; border-radius: 8px; color: #00FF88; text-align: center;"><i class="fas fa-paper-plane"></i> Thank you! I will get back to you as soon as possible.</div>';
      }

      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        if (formStatus) formStatus.innerHTML = '';
      }, 5000);
    }, 1200);
  });
}
