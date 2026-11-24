// Simple script for Phase 1 portfolio interactions

// Mobile navbar toggle (if needed for future enhancements)
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

// Add toggle functionality if needed
document.querySelector('.navbar').style.position = 'relative';
document.querySelector('.navbar').prepend(navToggle);

// Smooth scrolling for anchor links
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

// Add active state to current section in navbar
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
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
});

// Initialize: set home as active
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
});