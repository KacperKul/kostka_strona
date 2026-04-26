// Burger menu (mobile)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Prosta obsługa formularza bez backendu
const form = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');

if (form && formNote) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      formNote.textContent = 'Uzupełnij wszystkie pola formularza.';
      return;
    }

    formNote.textContent = 'Dziękujemy! Skontaktujemy się z Tobą najszybciej jak to możliwe.';
    form.reset();
  });
}

// Aktualny rok w stopce
const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Animacje fade-in on-scroll
const fadeElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => observer.observe(el));
} else {
  fadeElements.forEach((el) => el.classList.add('is-visible'));
}
