// Phase 2 Enhanced JavaScript - Interactions for all sections

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    
    // 1. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
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
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos > sectionTop && scrollPos <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    // Update nav on scroll
    window.addEventListener('scroll', highlightNavSection);
    
    // Set home as active initially
    document.addEventListener('DOMContentLoaded', () => {
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    });
    
    // 3. Parallax effect for hero photo
    const heroPhoto = document.querySelector('.hero-photo');
    if (heroPhoto) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            heroPhoto.style.transform = `translateY(${scrollPos * 0.2}px)`;
        });
    }
    
    // 4. Counter/number animation for statistics (Phase 2)
    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseFloat(target.dataset.target || target.innerText.replace(/[^\d.]/g, ''));
                    let currentValue = 0;
                    const increment = finalValue / 50;
                    const duration = 2000;
                    const stepTime = duration / 50;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            target.innerText = finalValue + '+';
                            clearInterval(timer);
                        } else {
                            target.innerText = Math.floor(currentValue) + '+';
                        }
                    }, stepTime);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(num => observer.observe(num));
    };
    
    // 5. Form submission feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name') || 'Friend';
            const enquiryType = formData.get('enquiry-type') || 'enquiry';
            
            // Simple validation
            const email = formData.get('email');
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert(`Thank you ${name}! Your ${enquiryType} has been received. I will get back to you soon.`);
            contactForm.reset();
        });
    }
    
    // 6. Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s, box-shadow 0.3s';
        });
    });
    
    // 7. Publication card hover effects
    const publicationCards = document.querySelectorAll('.publication-card');
    publicationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s, box-shadow 0.3s';
        });
    });
    
    // 8. Staggered animation on scroll
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        reveals.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s, transform 0.5s';
            observer.observe(el);
        });
    };
    
    // 9. Add project button interaction
    const addProjectBtn = document.querySelector('.add-project-btn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Project addition feature - please use the administrator dashboard to add new projects.');
        });
    }
    
    // 10. Add publication button interaction
    const addPublicationBtn = document.querySelector('.add-publication-btn');
    if (addPublicationBtn) {
        addPublicationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Publication addition feature - please use the administrator dashboard to add new publications.');
        });
    }
    
    // 11. Staggered reveal animation
    revealOnScroll();
    
    // 12. Initialize counter animation
    animateCounters();
    
    // 13. Mobile menu toggle (for future enhancements)
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';
    navToggle.style.display = 'none';
    navToggle.style.position = 'absolute';
    navToggle.style.top = '1rem';
    navToggle.style.right = '2rem';
    navToggle.style.background = 'none';
    navToggle.style.border = 'none';
    navToggle.style.color = 'var(--navy)';
    navToggle.style.fontSize = '1.5rem';
    navToggle.style.cursor = 'pointer';
    
    const navLinksContainer = document.querySelector('.nav-links');
    if (navLinksContainer) {
        navLinksContainer.style.position = 'relative';
        navLinksContainer.parentElement.style.position = 'relative';
    }
});