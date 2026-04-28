// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Active nav link by data-page attribute on body
const currentPage = document.body.dataset.page;
if (currentPage) {
  const active = document.querySelector(`.nav-link[data-page='${currentPage}']`);
  if (active) active.classList.add('active');
}

// Header scroll state
const header = document.querySelector('.site-header');
if (header) {
  const setHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
}

// Before / After slider (index only)
const slider = document.querySelector('#ba-range');
const afterImage = document.querySelector('.ba-after');
const baLine = document.querySelector('.ba-line');
const baHandle = document.querySelector('.ba-handle');

if (slider && afterImage && baLine && baHandle) {
  const updateBA = (value) => {
    afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
    baLine.style.left = `${value}%`;
    baHandle.style.left = `${value}%`;
  };

  updateBA(slider.value);
  slider.addEventListener('input', (event) => updateBA(event.target.value));
}

// Portfolio filter (realizacje)
const filterButtons = document.querySelectorAll('.filter-btn');
const filterCards = document.querySelectorAll('.gallery-card');

if (filterButtons.length && filterCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      filterCards.forEach((card) => {
        const show = target === 'all' || card.dataset.category === target;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// Lightbox (realizacje)
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxClose = document.querySelector('#lightbox-close');

if (lightbox && lightboxImage) {
  document.querySelectorAll('.gallery-card img').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add('open');
    });
  });

  const closeLightbox = () => lightbox.classList.remove('open');
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((item) => observer.observe(item));
} else {
  revealElements.forEach((item) => item.classList.add('visible'));
}


// Footer year
const yearNode = document.querySelector('#year');
if (yearNode) yearNode.textContent = new Date().getFullYear();
