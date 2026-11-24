// Phase 2 Enhanced JavaScript - Interactions for all sections

document.addEventListener('DOMContentLoaded', () => {
    // Load any saved profile updates from Admin Dashboard (localStorage)
    try {
        const savedProfile = JSON.parse(localStorage.getItem('portfolio_profile') || 'null');
        if (savedProfile) {
            const heroHeadline = document.getElementById('hero-headline');
            const aboutBio = document.getElementById('about-bio');
            const contactEmail = document.getElementById('contact-email');
            if (heroHeadline && savedProfile.headline) heroHeadline.textContent = savedProfile.headline;
            if (aboutBio && savedProfile.biography) aboutBio.textContent = savedProfile.biography;
            if (contactEmail && savedProfile.email) contactEmail.textContent = savedProfile.email;
        }
    } catch {
        // Ignore storage errors
    }

    // 1. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Active navigation section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const highlightNavSection = () => {
        const scrollPos = window.scrollY + 120;
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
    };

    window.addEventListener('scroll', highlightNavSection);

    // 3. Counter/number animation for statistics
    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const originalText = target.innerText.trim();
                    const hasPlus = originalText.endsWith('+');
                    const finalValue = parseFloat(target.dataset.target || originalText.replace(/[^\d.]/g, '')) || 0;
                    let currentValue = 0;
                    const steps = 30;
                    const increment = finalValue / steps;
                    const stepTime = 35;

                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            target.innerText = finalValue + (hasPlus ? '+' : '');
                            clearInterval(timer);
                        } else {
                            target.innerText = Math.floor(currentValue) + (hasPlus ? '+' : '');
                        }
                    }, stepTime);

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.4 });

        statNumbers.forEach(num => observer.observe(num));
    };

    // 4. Form submission feedback (inline, persists enquiry to localStorage for Admin view)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = String(formData.get('name') || 'Visitor').trim();
            const email = String(formData.get('email') || '').trim();
            const enquiryType = String(formData.get('enquiry-type') || 'enquiry').trim();
            const message = String(formData.get('message') || '').trim();
            const statusEl = contactForm.querySelector('.form-status');

            if (!email || !email.includes('@')) {
                if (statusEl) {
                    statusEl.style.color = '#c62828';
                    statusEl.textContent = 'Please enter a valid email address.';
                }
                return;
            }

            try {
                const enquiries = JSON.parse(localStorage.getItem('portfolio_enquiries') || '[]');
                enquiries.unshift({
                    name,
                    email,
                    enquiryType: enquiryType || 'General',
                    message,
                    date: new Date().toLocaleDateString()
                });
                localStorage.setItem('portfolio_enquiries', JSON.stringify(enquiries.slice(0, 50)));
            } catch {
                // Ignore storage errors
            }

            if (statusEl) {
                statusEl.style.color = '#2e7d32';
                statusEl.textContent = `Thank you, ${name}! Your ${enquiryType || 'enquiry'} has been received.`;
            }
            contactForm.reset();
        });
    }

    animateCounters();
});