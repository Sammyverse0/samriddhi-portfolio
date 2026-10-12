/* ==========================================================================
   SAMRIDDHI — Senior Creative Developer Portfolio Motion & Logic Engine
   - Hero Entrance Sequence (Word Stagger, Visual Fade-in)
   - 3D Computational Wireframe Surface Canvas
   - Hero Scroll-Exit Parallax
   - IntersectionObserver Reveal System (Section Headers, Project Stagger)
   - Minimalist Navbar State & Active Links
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroEntrance();
  initHeroVisualCanvas();
  initScrollAnimations();
  initContactForm();
});

/* ==========================================================================
   1. Minimalist Navigation Bar
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Spy
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

/* ==========================================================================
   2. Hero Entrance Sequence (1.0 - 1.5s Staggered Timeline)
   ========================================================================== */
function initHeroEntrance() {
  const words = document.querySelectorAll('.hero-heading .word-inner');
  const eyebrow = document.querySelector('.hero-eyebrow');
  const desc = document.querySelector('.hero-desc');
  const actions = document.querySelector('.hero-actions');
  const socials = document.querySelector('.hero-socials');
  const canvas = document.getElementById('hero-canvas');

  // Eyebrow reveal
  if (eyebrow) {
    eyebrow.style.opacity = '0';
    eyebrow.style.transform = 'translateY(10px)';
    eyebrow.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    setTimeout(() => {
      eyebrow.style.opacity = '1';
      eyebrow.style.transform = 'translateY(0)';
    }, 120);
  }

  // Heading word-by-word reveal (75ms stagger)
  words.forEach((word, index) => {
    setTimeout(() => {
      word.style.transform = 'translateY(0)';
      word.style.opacity = '1';
    }, 240 + index * 75);
  });

  // Supporting description reveal
  if (desc) {
    desc.style.opacity = '0';
    desc.style.transform = 'translateY(16px)';
    desc.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    setTimeout(() => {
      desc.style.opacity = '1';
      desc.style.transform = 'translateY(0)';
    }, 600);
  }

  // CTA Actions reveal
  if (actions) {
    actions.style.opacity = '0';
    actions.style.transform = 'translateY(16px)';
    actions.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    setTimeout(() => {
      actions.style.opacity = '1';
      actions.style.transform = 'translateY(0)';
    }, 780);
  }

  // Socials row reveal
  if (socials) {
    socials.style.opacity = '0';
    socials.style.transform = 'translateY(12px)';
    socials.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    setTimeout(() => {
      socials.style.opacity = '1';
      socials.style.transform = 'translateY(0)';
    }, 940);
  }

  // Canvas visual fade-in
  if (canvas) {
    setTimeout(() => {
      canvas.style.opacity = '1';
    }, 500);
  }
}

/* ==========================================================================
   3. 3D Computational Wireframe Surface Canvas
   - Parametric mathematical deforming surface
   - Morphing harmonic grid with thin violet & soft lavender lines
   - Subtle parallax response capped at 3 degrees
   - Smooth scroll exit fade
   ========================================================================== */
function initHeroVisualCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  let width, height;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Mouse interaction capped at subtle angle
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouse.targetX = ((e.clientX - cx) / cx) * 0.08; // Max ~4.5 degrees
    mouse.targetY = ((e.clientY - cy) / cy) * 0.08;
  });

  // Parametric mathematical surface parameters
  // Torus / Harmonic sphere morph
  const rows = 28;
  const cols = 28;
  let time = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    time += 0.007;

    const rotX = 0.45 + mouse.y * 0.6;
    const rotY = time * 0.18 + mouse.x * 0.8;
    const rotZ = Math.sin(time * 0.12) * 0.08;

    const scale = Math.min(width, height) * 0.34;
    const cx = width / 2;
    const cy = height / 2;

    // Generate deformed mathematical mesh points
    const grid = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      const u = (i / (rows - 1)) * Math.PI * 2;

      for (let j = 0; j < cols; j++) {
        const v = (j / (cols - 1)) * Math.PI;

        // Base geometry: Harmonic Toroid with deforming mathematical equations
        const r1 = 1.0;
        const r2 = 0.42 + Math.sin(u * 3 + time) * 0.06 + Math.cos(v * 2 - time * 0.8) * 0.05;

        // Parametric equations
        let x = (r1 + r2 * Math.cos(u)) * Math.cos(v);
        let y = (r1 + r2 * Math.cos(u)) * Math.sin(v);
        let z = r2 * Math.sin(u) + Math.sin(u * 2 + v * 3 + time * 1.5) * 0.08;

        // 3D Rotation Matrix
        // Yaw (rotY)
        let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        let z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
        let y1 = y;

        // Pitch (rotX)
        let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
        let x2 = x1;

        // Roll (rotZ)
        let x3 = x2 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
        let y3 = x2 * Math.sin(rotZ) + y2 * Math.cos(rotZ);
        let z3 = z2;

        // Perspective Projection
        const fov = 3.2;
        const pz = fov / (fov + z3);
        const projX = cx + x3 * scale * pz;
        const projY = cy + y3 * scale * pz;

        grid[i][j] = {
          x: projX,
          y: projY,
          z: z3,
          pz: pz
        };
      }
    }

    // Render wireframe lines with depth-mapped lavender/violet gradients
    ctx.lineWidth = 0.75;

    // Draw longitudinal lines
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols - 1; j++) {
        const p1 = grid[i][j];
        const p2 = grid[i][j + 1];

        const avgZ = (p1.z + p2.z) * 0.5;
        // Depth alpha between 0.12 and 0.85
        const alpha = Math.min(0.85, Math.max(0.12, (avgZ + 1.2) / 2.4));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(199, 164, 255, ${alpha * 0.65})`;
        ctx.stroke();
      }
    }

    // Draw latitudinal lines
    for (let j = 0; j < cols; j++) {
      for (let i = 0; i < rows - 1; i++) {
        const p1 = grid[i][j];
        const p2 = grid[i + 1][j];

        const avgZ = (p1.z + p2.z) * 0.5;
        const alpha = Math.min(0.8, Math.max(0.08, (avgZ + 1.2) / 2.4));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(169, 112, 255, ${alpha * 0.5})`;
        ctx.stroke();
      }
    }

    // Connect seam
    for (let j = 0; j < cols; j++) {
      const p1 = grid[rows - 1][j];
      const p2 = grid[0][j];
      const avgZ = (p1.z + p2.z) * 0.5;
      const alpha = Math.min(0.7, Math.max(0.08, (avgZ + 1.2) / 2.4));
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `rgba(169, 112, 255, ${alpha * 0.4})`;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }

  render();

  // Animation B: Hero exit during scrolling
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroH = window.innerHeight;
    if (scrollY <= heroH) {
      const progress = scrollY / heroH;
      // Reduce opacity gradually
      const newOpacity = Math.max(0, 1 - progress * 1.35);
      // Move visual upward slightly (-30px max)
      const translateY = -progress * 30;
      // Reduce scale slightly (max ~5%)
      const scale = 1 - progress * 0.05;

      canvas.style.opacity = newOpacity.toString();
      canvas.style.transform = `translateY(${translateY}px) scale(${scale})`;
    }
  }, { passive: true });
}

/* ==========================================================================
   4. Scroll Animation System (Intersection Observer)
   ========================================================================== */
function initScrollAnimations() {
  // Reveal section headings
  const sectionHeaderObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const header = entry.target;
        const label = header.querySelector('.section-label');
        const title = header.querySelector('.section-title');
        const desc = header.querySelector('.section-desc');

        if (label) {
          label.style.opacity = '0';
          label.style.transform = 'translateY(16px)';
          label.style.transition = 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
          setTimeout(() => {
            label.style.opacity = '1';
            label.style.transform = 'translateY(0)';
          }, 30);
        }

        if (title) {
          title.style.opacity = '0';
          title.style.transform = 'translateY(20px)';
          title.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
          setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
          }, 110);
        }

        if (desc) {
          desc.style.opacity = '0';
          desc.style.transform = 'translateY(18px)';
          desc.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
          setTimeout(() => {
            desc.style.opacity = '1';
            desc.style.transform = 'translateY(0)';
          }, 200);
        }

        obs.unobserve(header);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section-header').forEach(sh => sectionHeaderObserver.observe(sh));

  // Animation C: Project Cards Staggered Reveal
  const projectGrid = document.querySelector('.projects-grid');
  if (projectGrid) {
    const projectObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.project-card');
          cards.forEach((card, i) => {
            card.classList.add('project-card-reveal');
            setTimeout(() => {
              card.classList.add('revealed');
            }, i * 130); // 130ms stagger
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    projectObserver.observe(projectGrid);
  }

  // Skills Category Groups Reveal
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    const skillsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const boxes = entry.target.querySelectorAll('.skill-category-box');
          boxes.forEach((box, i) => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(22px)';
            box.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
            setTimeout(() => {
              box.style.opacity = '1';
              box.style.transform = 'translateY(0)';
            }, i * 110);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    skillsObserver.observe(skillsGrid);
  }

  // CP Profiles Reveal
  const cpGrid = document.querySelector('.cp-profiles-grid');
  if (cpGrid) {
    const cpObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.cp-profile-card');
          cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 120);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    cpObserver.observe(cpGrid);
  }
}

/* ==========================================================================
   5. Contact Form Transmission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const msgBox = document.getElementById('form-response-msg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origHTML = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Transmitted';
      btn.style.background = 'var(--accent-lavender)';
      btn.style.borderColor = 'var(--accent-lavender)';
      btn.style.color = '#08080B';

      if (msgBox) {
        msgBox.innerHTML = '<span style="color: var(--accent-lavender);"><i class="fas fa-check-circle"></i> Thank you! Your message has been received. I will reply soon.</span>';
      }

      form.reset();

      setTimeout(() => {
        btn.innerHTML = origHTML;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        if (msgBox) msgBox.innerHTML = '';
      }, 5000);
    }, 1000);
  });
}
