// Phase 3 Admin Dashboard JavaScript
// Handles all administrator functions and interactions

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    
    // 1. Sidebar Toggle
    const sidebar = document.querySelector('.admin-sidebar');
    const topBar = document.querySelector('.top-bar');
    const content = document.querySelector('.admin-content');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            topBar.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
        });
    }
    
    // 2. Navigation Activation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active navigation
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('id') === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Default: activate dashboard
    document.querySelector('.sidebar-nav a[data-section="dashboard"]').click();
    
    // 3. Profile Management
    const profileForm = document.getElementById('profile-form');
    const biographyTextarea = document.getElementById('biography');
    const previewName = document.getElementById('preview-name');
    const previewHeadline = document.getElementById('preview-headline');
    const previewBio = document.getElementById('preview-bio');
    const fullNameInput = document.getElementById('full-name');
    const headlineInput = document.getElementById('headline');
    
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = fullNameInput.value;
            const headline = headlineInput.value;
            const biography = biographyTextarea.value;
            
            // Update preview
            previewName.textContent = name;
            previewHeadline.textContent = headline;
            previewBio.textContent = biography;
            
            // Show success message
            alert('Profile information updated successfully!');
        });
    }
    
    // 4. Education Management
    const addEducationBtn = document.querySelector('.add-education button');
    const educationContainer = document.querySelector('.education-management');
    
    if (addEducationBtn) {
        let educationCount = 1;
        
        addEducationBtn.addEventListener('click', () => {
            if (educationCount >= 5) {
                alert('Maximum of 5 educational qualifications allowed.');
                return;
            }
            
            const educationEntry = document.createElement('div');
            educationEntry.className = 'education-entry';
            educationEntry.innerHTML = `
                <div>
                    <h3>Qualification ${educationCount + 1}</h3>
                    <p>Institution: <input type="text" class="edu-institution"></p>
                    <p>Duration: <input type="text" class="edu-duration" placeholder="e.g., 4 years"></p>
                </div>
                <button class="education-remove">×</button>
            `;
            
            educationContainer.insertBefore(educationEntry, addEducationBtn);
            educationCount++;
        });
    }
    
    // Education entry removal
    educationContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('education-remove')) {
            e.target.parentElement.remove();
        }
    });
    
    // 5. Certifications Management
    const addCertBtn = document.querySelector('.add-certification button');
    const certContainer = document.querySelector('.certifications-management');
    let certCount = 1;
    
    if (addCertBtn && certContainer) {
        addCertBtn.addEventListener('click', () => {
            if (certCount >= 10) {
                alert('Maximum of 10 certifications allowed.');
                return;
            }
            
            const certEntry = document.createElement('div');
            certEntry.className = 'certification-entry';
            certEntry.innerHTML = `
                <div>
                    <h3>Certification ${certCount + 1}</h3>
                    <p>Awarding Institution: <input type="text" class="cert-institution"></p>
                </div>
                <div>
                    <button class="btn-edit cert-edit">Edit</button>
                    <button class="btn-delete cert-delete">Delete</button>
                </div>
            `;
            
            certContainer.insertBefore(certEntry, addCertBtn);
            certCount++;
        });
    }
    
    // Certification entry removal
    certContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cert-delete')) {
            e.target.parentElement.parentElement.remove();
        }
    });
    
    // 6. Experience Management
    const addExperienceBtn = document.querySelector('.add-experience button');
    const expContainer = document.querySelector('.experience-management');
    let expCount = 1;
    
    if (addExperienceBtn && expContainer) {
        addExperienceBtn.addEventListener('click', () => {
            if (expCount >= 20) {
                alert('Maximum of 20 employment entries allowed.');
                return;
            }
            
            const expEntry = document.createElement('div');
            expEntry.className = 'experience-entry';
            expEntry.innerHTML = `
                <div class="exp-org">
                    <label>Organisation</label>
                    <input type="text" class="exp-org-input">
                </div>
                <div class="exp-position">
                    <label>Position</label>
                    <input type="text" class="exp-position-input">
                </div>
                <div class="exp-duration">
                    <label>Duration</label>
                    <input type="text" class="exp-duration-input" placeholder="years">
                </div>
                <button class="exp-remove">×</button>
            `;
            
            expContainer.insertBefore(expEntry, addExperienceBtn);
            expCount++;
        });
    }
    
    // Experience entry removal
    expContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('exp-remove')) {
            e.target.parentElement.remove();
        }
    });
    
    // 7. Expertise Management
    const addExpertiseBtn = document.querySelector('.add-expertise button');
    const expertiseContainer = document.querySelector('.expertise-management');
    
    if (addExpertiseBtn && expertiseContainer) {
        addExpertiseBtn.addEventListener('click', () => {
            const expertiseTag = document.createElement('div');
            expertiseTag.className = 'expertise-tag';
            expertiseTag.innerHTML = `
                <span>New Expertise Area</span>
                <button class="expertise-remove">×</button>
            `;
            
            expertiseContainer.insertBefore(expertiseTag, addExpertiseBtn);
        });
    }
    
    // Expertise removal
    expertiseContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('expertise-remove')) {
            e.target.parentElement.remove();
        }
    });
    
    // 8. Achievements Management
    const addAchievementBtn = document.querySelector('.add-achievement button');
    const achievementsContainer = document.querySelector('.achievements-management');
    let achievementCount = 1;
    const maxAchievements = 4; // Per PRD
    
    if (addAchievementBtn && achievementsContainer) {
        addAchievementBtn.addEventListener('click', () => {
            if (achievementCount >= maxAchievements) {
                alert(`Maximum of ${maxAchievements} achievement areas allowed (as per PRD).`);
                return;
            }
            
            const achievementEntry = document.createElement('div');
            achievementEntry.className = 'achievement-entry';
            achievementEntry.innerHTML = `
                <div>
                    <label>Maintenance Cost Reduction</label> <!-- This would be dynamic based on type -->
                    <textarea rows="2" class="achievement-desc" placeholder="Describe the achievement..."></textarea>
                </div>
                <button class="achievement-remove">×</button>
            `;
            
            achievementsContainer.insertBefore(achievementEntry, addAchievementBtn);
            achievementCount++;
        });
    }
    
    // Achievement entry removal
    achievementsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('achievement-remove')) {
            e.target.parentElement.remove();
            achievementCount--;
        }
    });
    
    // 9. Companies Management
    const addCompanyBtn = document.querySelector('.add-company button');
    const companiesContainer = document.querySelector('.companies-management');
    let companyCount = 2; // Start at 2 since PRD has 2 companies
    const maxCompanies = 2; // Per PRD
    
    if (addCompanyBtn && companiesContainer) {
        addCompanyBtn.addEventListener('click', () => {
            if (companyCount >= maxCompanies) {
                alert(`Maximum of ${maxCompanies} companies allowed (as per PRD). Currently: ${companyCount} of ${maxCompanies}.`);
                return;
            }
            
            const companyEntry = document.createElement('div');
            companyEntry.className = 'company-entry';
            companyEntry.innerHTML = `
                <div class="company-logo-preview">
                    <div class="logo-icon">NEW</div>
                </div>
                <div class="company-info">
                    <h3>New Company</h3>
                    <p><strong>Founder & CEO</strong></p>
                    <p>Business description...</p>
                </div>
                <button class="company-remove">×</button>
            `;
            
            companiesContainer.insertBefore(companyEntry, addCompanyBtn);
            companyCount++;
        });
    }
    
    // Company entry removal
    companiesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('company-remove')) {
            e.target.parentElement.remove();
            companyCount--;
        }
    });
    
    // 10. Projects Management
    const addProjectBtn = document.querySelector('.add-project button');
    const projectsContainer = document.querySelector('.projects-management');
    let projectCount = 0;
    const maxProjects = 50;
    
    if (addProjectBtn && projectsContainer) {
        addProjectBtn.addEventListener('click', () => {
            if (projectCount >= maxProjects) {
                alert('Maximum of 50 projects allowed.');
                return;
            }
            
            const projectEntry = document.createElement('div');
            projectEntry.className = 'project-entry';
            projectEntry.innerHTML = `
                <div class="project-image-upload">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #1a237e;">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <circle cx="15.5" cy="15.5" r="1.5"/>
                    </svg>
                    <span>Project Image</span>
                </div>
                <div class="project-info">
                    <h3>Project Title</h3>
                    <p>Description...</p>
                    <p class="project-business">Business: <span>ATX TECHNOLOGIES</span></p>
                </div>
                <button class="project-remove">×</button>
            `;
            
            projectsContainer.insertBefore(projectEntry, addProjectBtn);
            projectCount++;
        });
    }
    
    // Project entry removal
    projectsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-remove')) {
            e.target.parentElement.remove();
            projectCount--;
        }
    });
    
    // 11. Publications Management
    const addPublicationBtn = document.querySelector('.add-publication button');
    const publicationsContainer = document.querySelector('.publications-management');
    let publicationCount = 0;
    const maxPublications = 30;
    
    if (addPublicationBtn && publicationsContainer) {
        addPublicationBtn.addEventListener('click', () => {
            if (publicationCount >= maxPublications) {
                alert('Maximum of 30 publications allowed.');
                return;
            }
            
            const publicationEntry = document.createElement('div');
            publicationEntry.className = 'publication-entry';
            publicationEntry.innerHTML = `
                <div class="pub-type-tag">Article</div>
                <div pub-title>
                    <h3>Publication Title</h3>
                </div>
                <div pub-meta>
                    <p>Date: <span>Pending</span></p>
                    <p>Category: <span>Professional</span></p>
                </div>
                <button class="pub-remove">Remove</button>
            `;
            
            publicationsContainer.insertBefore(publicationEntry, addPublicationBtn);
            publicationCount++;
        });
    }
    
    // Publication entry removal
    publicationsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('pub-remove')) {
            e.target.parentElement.remove();
            publicationCount--;
        }
    });
    
    // 12. Contact Enquiries Management (simulate loading)
    const enquiryStats = document.querySelectorAll('.enquiry-stat .stat-small div');
    if (enquiryStats.length > 0) {
        // Simulate statistics
        const totalEnquiries = Math.floor(Math.random() * 500) + 100;
        const todayEnquiries = Math.floor(Math.random() * 50) + 10;
        
        enquiryStats[0].textContent = totalEnquiries.toLocaleString();
        enquiryStats[1].textContent = todayEnquiries;
    }
    
    // 13. Statistics Management
    const visitorCount = document.getElementById('visitor-count');
    const projectCountEl = document.getElementById('project-count');
    const enquiryCount = document.getElementById('enquiry-count');
    const cvDownloads = document.getElementById('cv-downloads');
    
    // Simulate statistics
    if (visitorCount) visitorCount.textContent = (Math.floor(Math.random() * 10000) + 5000).toLocaleString();
    if (projectCountEl) projectCountEl.textContent = Math.floor(Math.random() * 200) + 50;
    if (enquiryCount) enquiryCount.textContent = Math.floor(Math.random() * 300) + 50;
    if (cvDownloads) cvDownloads.textContent = Math.floor(Math.random() * 100) + 20;
    
    // Chart initialization (simple placeholder)
    const ctx = document.getElementById('visitors-chart');
    if (ctx && typeof Chart !== 'undefined') {
        const visitorsChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                datasets: [{
                    label: 'Visitors',
                    data: [Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 100) + 50],
                    borderColor: '#1a237e',
                    backgroundColor: 'rgba(26, 35, 126, 0.1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // 14. Settings Management
    const settingsForm = document.querySelector('.settings-form');
    const websiteTitle = document.getElementById('website-title');
    const colorScheme = document.getElementById('color-scheme');
    const metaDescription = document.getElementById('meta-description');
    const cvDownloadEnabled = document.getElementById('cv-download-enabled');
    const commentsEnabled = document.getElementById('comments-enabled');
    const googleAnalytics = document.getElementById('google-analytics');
    const settingsSaved = document.querySelector('.settings-saved');
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect settings
            const settings = {
                websiteTitle: websiteTitle.value,
                colorScheme: colorScheme.value,
                metaDescription: metaDescription.value,
                cvDownloadEnabled: cvDownloadEnabled.checked,
                commentsEnabled: commentsEnabled.checked,
                googleAnalytics: googleAnalytics.value
            };
            
            // Show saved state
            if (settingsSaved) {
                settingsSaved.style.display = 'block';
                setTimeout(() => {
                    settingsSaved.style.display = 'none';
                }, 3000);
            }
            
            alert('Settings saved successfully!');
        });
    }
    
    // 15. Form validation for key sections
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--error-red)';
                } else {
                    input.style.borderColor = 'var(--border-color)';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // 16. Staggered reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        revealObserver.observe(el);
    });
    
    // 17. Initialize tooltips
    const tooltips = document.querySelectorAll('[title]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--navy);
                color: var(--white);
                padding: 0.5rem 0.75rem;
                border-radius: 4px;
                font-size: 0.75rem;
                z-index: 1000;
                bottom: calc(100% + 8px);
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
            `;
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            
            // Remove on hover leave
            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    });
});