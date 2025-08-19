// Loading Screen and Welcome Modal
window.addEventListener('load', () => {
  // Fade out loading screen
  gsap.to('#loadingScreen', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out',
    onComplete: () => {
      document.getElementById('loadingScreen').style.display = 'none';
      // Show welcome modal
      gsap.to('#welcomeModal', {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
      });
    },
  });
});

// Close Welcome Modal
function closeWelcomeModal() {
  gsap.to('#welcomeModal', {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      document.getElementById('welcomeModal').style.display = 'none';
    },
  });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
  mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
  gsap.fromTo(
    mobileMenu,
    { height: 0, opacity: 0 },
    {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.4,
      ease: 'power2.out',
    }
  );
});

// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const phrases = [
  'Building Intelligent Systems',
  'Transforming Data into Insights',
  'Crafting AI-Powered Solutions',
  'Innovating with Computer Vision',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typewriter.textContent = currentPhrase.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 200);
    } else {
      setTimeout(type, 50);
    }
  } else {
    typewriter.textContent = currentPhrase.substring(0, charIndex++);
    if (charIndex > currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else {
      setTimeout(type, 100);
    }
  }
}
type();

// Three.js Particle Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('particles').appendChild(renderer.domElement);

const particleCount = 500; // Optimized for performance
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 100;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  velocities[i * 3] = (Math.random() - 0.5) * 0.02;
  velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
  velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({
  color: 0x667eea,
  size: 0.2,
  transparent: true,
  opacity: 0.6,
});
const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);
camera.position.z = 50;

function animateParticles() {
  requestAnimationFrame(animateParticles);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] += velocities[i];
    positions[i + 1] += velocities[i + 1];
    positions[i + 2] += velocities[i + 2];
    if (Math.abs(positions[i]) > 50) velocities[i] *= -1;
    if (Math.abs(positions[i + 1]) > 50) velocities[i + 1] *= -1;
    if (Math.abs(positions[i + 2]) > 50) velocities[i + 2] *= -1;
  }
  particles.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}
animateParticles();

// Optimize for Resize
const resizeObserver = new ResizeObserver(() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
resizeObserver.observe(document.body);

// Intersection Observer for Performance
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        cancelAnimationFrame(animateParticles);
      } else {
        animateParticles();
      }
    });
  },
  { threshold: 0.1 }
);
observer.observe(document.getElementById('particles'));

// GSAP Animations for Sections
gsap.utils.toArray('section').forEach((section) => {
  gsap.from(section.querySelectorAll('.glass-effect, h2, p, .btn-primary, .btn-outline, .tech-badge'), {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
});

// Skill Progress Bars Animation (Set to 100% width)
gsap.utils.toArray('.skill-progress').forEach((bar) => {
  bar.setAttribute('data-width', '100%'); // Set all progress bars to 100%
  gsap.to(bar, {
    width: '100%',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: bar,
      start: 'top 80%',
    },
  });
});

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    
    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || filter === category) {
        card.style.display = 'block';
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            card.style.display = 'none';
          },
        });
      }
    });
  });
});

// Form Submission with Formspree
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });
    if (response.ok) {
      contactForm.reset();
      alert('Message sent successfully!');
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    alert('Error sending message. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
  }
});

// Smooth Scroll for Navigation
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
    // Update active link
    document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenuBtn.click();
    }
    if (document.getElementById('welcomeModal').style.display !== 'none') {
      closeWelcomeModal();
    }
  }
});

// Collapsible Skill Categories
document.querySelectorAll('.skill-category-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const content = toggle.nextElementSibling;
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    content.classList.toggle('hidden');
    gsap.fromTo(
      content,
      { maxHeight: isExpanded ? content.scrollHeight : 0, opacity: isExpanded ? 1 : 0 },
      { maxHeight: isExpanded ? 0 : content.scrollHeight, opacity: isExpanded ? 0 : 1, duration: 0.4, ease: 'power2.out' }
    );
  });
});

// Skill Progress Bars Animation (Dynamic Width)
gsap.utils.toArray('.skill-progress').forEach((bar) => {
  const width = bar.getAttribute('data-width');
  gsap.to(bar, {
    width: width,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: bar,
      start: 'top 80%',
    },
  });
});