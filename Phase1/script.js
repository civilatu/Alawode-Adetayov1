// Simple script for Phase 1 portfolio interactions

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navLinksContainer = document.querySelector('.nav-links');

    // Mobile navbar toggle
    if (navbar && navLinksContainer) {
        const navToggle = document.createElement('button');
        navToggle.type = 'button';
        navToggle.className = 'nav-toggle';
        navToggle.setAttribute('aria-label', 'Toggle navigation');
        navToggle.innerHTML = '☰';
        navToggle.style.display = 'none';
        navToggle.style.background = 'none';
        navToggle.style.border = 'none';
        navToggle.style.color = 'var(--navy)';
        navToggle.style.fontSize = '1.5rem';
        navToggle.style.cursor = 'pointer';

        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });

        navbar.querySelector('.container')?.appendChild(navToggle);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                navLinksContainer?.classList.remove('open');
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active state for current section in navbar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Contact form submission with inline feedback (no window.alert)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = String(formData.get('name') || 'Visitor').trim();
            const email = String(formData.get('email') || '').trim();
            const statusEl = contactForm.querySelector('.form-status');

            if (!email.includes('@')) {
                if (statusEl) {
                    statusEl.style.color = '#c62828';
                    statusEl.textContent = 'Please enter a valid email address.';
                }
                return;
            }

            if (statusEl) {
                statusEl.style.color = '#2e7d32';
                statusEl.textContent = `Thank you, ${name}! Your message has been received.`;
            }
            contactForm.reset();
        });
    }
});