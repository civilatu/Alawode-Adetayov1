// Phase 3 Admin Dashboard JavaScript
// Handles all administrator functions and interactions

document.addEventListener('DOMContentLoaded', () => {
    const toastEl = document.getElementById('admin-toast');
    let toastTimer;

    const showToast = (message, isError = false) => {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.style.borderLeftColor = isError ? '#f44336' : '#ffd700';
        toastEl.style.display = 'block';
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastEl.style.display = 'none';
        }, 3200);
    };

    // 1. Sidebar Toggle
    const sidebar = document.querySelector('.admin-sidebar');
    const topBar = document.querySelector('.top-bar');
    const content = document.querySelector('.admin-content');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    if (sidebarToggle && sidebar && topBar && content) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            topBar.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
        });
    }

    // 2. Navigation Activation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.section');

    const activateSection = (sectionId) => {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-section') === sectionId);
        });
        sections.forEach(section => {
            section.classList.toggle('active', section.getAttribute('id') === sectionId);
        });
        sidebar?.classList.remove('open');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            if (sectionId) {
                history.replaceState(null, '', `#${sectionId}`);
                activateSection(sectionId);
            }
        });
    });

    // Quick Action navigation buttons
    document.querySelectorAll('.action-btn[data-target-section]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target-section');
            if (target) activateSection(target);
        });
    });

    // Activate hash section or dashboard by default
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        activateSection(initialHash);
    } else {
        activateSection('dashboard');
    }

    // 3. Profile & Biography Management (with localStorage sync to Phase 2)
    const profileForm = document.getElementById('profile-form');
    const biographyForm = document.getElementById('biography-form');
    const biographyTextarea = document.getElementById('biography-input');
    const bioEditor = document.getElementById('bio-editor');
    const previewName = document.getElementById('preview-name');
    const previewHeadline = document.getElementById('preview-headline');
    const previewBio = document.getElementById('preview-bio');
    const fullNameInput = document.getElementById('full-name');
    const headlineInput = document.getElementById('headline');
    const emailInput = document.getElementById('email');

    try {
        const savedProfile = JSON.parse(localStorage.getItem('portfolio_profile') || 'null');
        if (savedProfile) {
            if (headlineInput && savedProfile.headline) headlineInput.value = savedProfile.headline;
            if (emailInput && savedProfile.email) emailInput.value = savedProfile.email;
            if (biographyTextarea && savedProfile.biography) biographyTextarea.value = savedProfile.biography;
            if (bioEditor && savedProfile.biography) bioEditor.value = savedProfile.biography;
            if (previewHeadline && savedProfile.headline) previewHeadline.textContent = savedProfile.headline;
            if (previewBio && savedProfile.biography) previewBio.textContent = savedProfile.biography;
        }
    } catch {
        // Ignore storage errors
    }

    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = fullNameInput?.value.trim() || 'Alawode Adetayo';
            const headline = headlineInput?.value.trim() || '';
            const email = emailInput?.value.trim() || '';
            const biography = biographyTextarea?.value.trim() || '';

            if (previewName) previewName.textContent = name;
            if (previewHeadline) previewHeadline.textContent = headline;
            if (previewBio) previewBio.textContent = biography;
            if (bioEditor) bioEditor.value = biography;

            try {
                localStorage.setItem('portfolio_profile', JSON.stringify({ name, headline, email, biography }));
            } catch {
                // Ignore storage errors
            }

            showToast('Profile information saved.');
        });
    }

    if (biographyForm) {
        biographyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const biography = bioEditor?.value.trim() || '';
            if (biographyTextarea) biographyTextarea.value = biography;
            if (previewBio) previewBio.textContent = biography;

            try {
                const existing = JSON.parse(localStorage.getItem('portfolio_profile') || '{}');
                localStorage.setItem('portfolio_profile', JSON.stringify({ ...existing, biography }));
            } catch {
                // Ignore storage errors
            }

            showToast('Biography saved.');
        });
    }

    // Helper for list management sections
    const setupAddRemove = ({
        containerSelector,
        addWrapperSelector,
        itemSelector,
        removeSelector,
        maxCount,
        countTextSelector,
        countLabel,
        createItemHtml
    }) => {
        const container = document.querySelector(containerSelector);
        const addWrapper = container?.querySelector(addWrapperSelector);
        const addBtn = addWrapper?.querySelector('button');
        const countEl = countTextSelector ? document.querySelector(countTextSelector) : null;

        const updateCount = () => {
            if (!container || !countEl) return;
            const current = container.querySelectorAll(itemSelector).length;
            countEl.textContent = `Maximum of ${maxCount} ${countLabel} allowed. Currently: ${current} of ${maxCount}.`;
        };

        if (container && addWrapper && addBtn) {
            addBtn.addEventListener('click', () => {
                const current = container.querySelectorAll(itemSelector).length;
                if (current >= maxCount) {
                    showToast(`Maximum of ${maxCount} ${countLabel} allowed.`, true);
                    return;
                }
                const wrapper = document.createElement('div');
                wrapper.innerHTML = createItemHtml(current + 1).trim();
                const node = wrapper.firstElementChild;
                if (node) {
                    container.insertBefore(node, addWrapper);
                    updateCount();
                }
            });

            container.addEventListener('click', (e) => {
                const removeBtn = e.target.closest(removeSelector);
                if (removeBtn) {
                    const entry = removeBtn.closest(itemSelector);
                    if (entry) {
                        entry.remove();
                        updateCount();
                    }
                }
            });
        }

        updateCount();
    };

    // 4. Education Management
    setupAddRemove({
        containerSelector: '.education-management',
        addWrapperSelector: '.add-education',
        itemSelector: '.education-entry',
        removeSelector: '.education-remove',
        maxCount: 5,
        countTextSelector: '#education-count-text',
        countLabel: 'qualifications',
        createItemHtml: (idx) => `
            <div class="education-entry">
                <div>
                    <h3>Qualification ${idx}</h3>
                    <p>Institution: <input type="text" class="edu-institution" placeholder="Institution name"></p>
                    <p>Duration: <input type="text" class="edu-duration" placeholder="e.g., 4 years"></p>
                </div>
                <button type="button" class="btn-remove education-remove">Remove</button>
            </div>
        `
    });

    // 5. Certifications Management
    setupAddRemove({
        containerSelector: '.certifications-management',
        addWrapperSelector: '.add-certification',
        itemSelector: '.certification-entry',
        removeSelector: '.cert-delete',
        maxCount: 10,
        countTextSelector: '#cert-count-text',
        countLabel: 'certifications',
        createItemHtml: (idx) => `
            <div class="certification-entry">
                <div class="certification-info">
                    <h3>Certification ${idx}</h3>
                    <p>Awarding Institution: <input type="text" class="cert-institution" placeholder="Institution"></p>
                </div>
                <div class="certification-actions">
                    <button type="button" class="btn-delete cert-delete">Delete</button>
                </div>
            </div>
        `
    });

    // 6. Experience Management
    setupAddRemove({
        containerSelector: '.experience-management',
        addWrapperSelector: '.add-experience',
        itemSelector: '.experience-entry',
        removeSelector: '.exp-remove',
        maxCount: 20,
        countTextSelector: '#exp-count-text',
        countLabel: 'employment entries',
        createItemHtml: () => `
            <div class="experience-entry">
                <div class="exp-org">
                    <label>Organisation</label>
                    <input type="text" placeholder="Organisation name">
                </div>
                <div class="exp-position">
                    <label>Position</label>
                    <input type="text" placeholder="Role / Title">
                </div>
                <div class="exp-duration">
                    <label>Duration</label>
                    <input type="text" placeholder="e.g., 2 years">
                </div>
                <button type="button" class="btn-remove exp-remove">Remove</button>
            </div>
        `
    });

    // 7. Expertise Management
    setupAddRemove({
        containerSelector: '.expertise-management',
        addWrapperSelector: '.add-expertise',
        itemSelector: '.expertise-tag',
        removeSelector: '.expertise-remove',
        maxCount: 10,
        countTextSelector: null,
        countLabel: 'expertise areas',
        createItemHtml: (idx) => `
            <div class="expertise-tag">
                <span>Expertise Area ${idx}</span>
                <button type="button" class="btn-remove expertise-remove">×</button>
            </div>
        `
    });

    // 8. Achievements Management
    setupAddRemove({
        containerSelector: '.achievements-management',
        addWrapperSelector: '.add-achievement',
        itemSelector: '.achievement-entry',
        removeSelector: '.achievement-remove',
        maxCount: 4,
        countTextSelector: null,
        countLabel: 'achievement areas',
        createItemHtml: (idx) => `
            <div class="achievement-entry">
                <div class="achievement-type">
                    <label>Achievement Area ${idx}</label>
                </div>
                <div class="achievement-desc">
                    <textarea rows="2" placeholder="Describe the achievement..."></textarea>
                </div>
                <button type="button" class="btn-remove achievement-remove">Remove</button>
            </div>
        `
    });

    // 9. Companies Management
    setupAddRemove({
        containerSelector: '.companies-management',
        addWrapperSelector: '.add-company',
        itemSelector: '.company-entry',
        removeSelector: '.company-remove',
        maxCount: 2,
        countTextSelector: '#companies-count-text',
        countLabel: 'companies',
        createItemHtml: () => `
            <div class="company-entry">
                <div class="company-logo-preview">
                    <div class="logo-icon">NEW</div>
                </div>
                <div class="company-info">
                    <h3>New Company</h3>
                    <p><strong>Founder &amp; CEO</strong></p>
                    <p>Business description...</p>
                </div>
                <button type="button" class="btn-remove company-remove">Remove</button>
            </div>
        `
    });

    // 10. Projects Management
    setupAddRemove({
        containerSelector: '.projects-management',
        addWrapperSelector: '.add-project',
        itemSelector: '.project-entry',
        removeSelector: '.project-remove',
        maxCount: 50,
        countTextSelector: null,
        countLabel: 'projects',
        createItemHtml: (idx) => `
            <div class="project-entry">
                <div class="project-image-upload">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #1a237e;">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <circle cx="15.5" cy="15.5" r="1.5"/>
                    </svg>
                    <span>Project ${idx}</span>
                </div>
                <div class="project-info">
                    <h3>New Project ${idx}</h3>
                    <p>Project description...</p>
                    <p class="project-business">Business: <span>ATX TECHNOLOGIES</span></p>
                </div>
                <button type="button" class="btn-remove project-remove">Remove</button>
            </div>
        `
    });

    // 11. Publications Management
    setupAddRemove({
        containerSelector: '.publications-management',
        addWrapperSelector: '.add-publication',
        itemSelector: '.publication-entry',
        removeSelector: '.pub-remove',
        maxCount: 30,
        countTextSelector: null,
        countLabel: 'publications',
        createItemHtml: (idx) => `
            <div class="publication-entry">
                <div class="pub-type-tag"><span>Article</span></div>
                <div class="pub-title">
                    <h3>Publication Title ${idx}</h3>
                </div>
                <div class="pub-meta">
                    <p>Status: <span>Pending approval</span></p>
                    <p>Category: <span>Professional</span></p>
                </div>
                <button type="button" class="btn-publication-remove pub-remove">Remove</button>
            </div>
        `
    });

    // 12. Load Contact Enquiries from localStorage
    const enquiriesList = document.getElementById('enquiries-list');
    const enquiriesTotalEl = document.getElementById('enquiries-total');
    const enquiriesTodayEl = document.getElementById('enquiries-today');
    const enquiryCountEl = document.getElementById('enquiry-count');
    const contactSubmissionsEl = document.getElementById('contact-submissions');

    let savedEnquiries = [];
    try {
        savedEnquiries = JSON.parse(localStorage.getItem('portfolio_enquiries') || '[]');
    } catch {
        savedEnquiries = [];
    }

    if (enquiriesList && savedEnquiries.length > 0) {
        enquiriesList.innerHTML = savedEnquiries.map(item => `
            <div class="education-entry" style="display:block; padding:1rem 0;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
                    <strong>${String(item.name).replace(/[<>&]/g, '')}</strong>
                    <span style="font-size:0.75rem; color:#5d6d7e;">${String(item.date || '').replace(/[<>&]/g, '')}</span>
                </div>
                <div style="font-size:0.8rem; color:#1a237e; margin-bottom:0.25rem;">${String(item.email).replace(/[<>&]/g, '')} • ${String(item.enquiryType || 'General').replace(/[<>&]/g, '')}</div>
                <p style="font-size:0.875rem; color:#2d3a4b;">${String(item.message || '').replace(/[<>&]/g, '')}</p>
            </div>
        `).join('');
    }

    const totalEnq = savedEnquiries.length;
    if (enquiriesTotalEl) enquiriesTotalEl.textContent = String(totalEnq);
    if (enquiriesTodayEl) enquiriesTodayEl.textContent = String(totalEnq);
    if (enquiryCountEl) enquiryCountEl.textContent = String(totalEnq);
    if (contactSubmissionsEl) contactSubmissionsEl.textContent = String(totalEnq);

    // 13. Dashboard Summary Metrics & Fallback Canvas Charts
    const visitorCountEl = document.getElementById('visitor-count');
    const projectCountEl = document.getElementById('project-count');
    const cvDownloadsEl = document.getElementById('cv-downloads');

    if (visitorCountEl) visitorCountEl.textContent = '1,240';
    if (projectCountEl) projectCountEl.textContent = String(document.querySelectorAll('.project-entry').length + 2);
    if (cvDownloadsEl) cvDownloadsEl.textContent = '86';

    const drawSimpleLineChart = (canvasId, values, labels) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const pad = 30;
        const maxVal = Math.max(...values, 1);

        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = '#e0e4ec';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad, pad);
        ctx.lineTo(pad, h - pad);
        ctx.lineTo(w - pad, h - pad);
        ctx.stroke();

        ctx.strokeStyle = '#1a237e';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        values.forEach((v, i) => {
            const x = pad + (i * (w - pad * 2)) / (values.length - 1);
            const y = h - pad - (v / maxVal) * (h - pad * 2);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        ctx.fillStyle = '#5d6d7e';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        values.forEach((v, i) => {
            const x = pad + (i * (w - pad * 2)) / (values.length - 1);
            const y = h - pad - (v / maxVal) * (h - pad * 2);
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#5d6d7e';
            ctx.fillText(labels[i], x, h - 10);
        });
    };

    const drawSimpleBarChart = (canvasId, items) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const pad = 32;
        const barWidth = (w - pad * 2) / items.length - 16;
        const maxVal = Math.max(...items.map(i => i.value), 1);

        ctx.clearRect(0, 0, w, h);
        items.forEach((item, idx) => {
            const x = pad + idx * ((w - pad * 2) / items.length) + 8;
            const barH = (item.value / maxVal) * (h - pad * 2);
            const y = h - pad - barH;

            ctx.fillStyle = idx % 2 === 0 ? '#1a237e' : '#ffd700';
            ctx.fillRect(x, y, barWidth, barH);

            ctx.fillStyle = '#2d3a4b';
            ctx.font = '11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth / 2, h - 10);
        });
    };

    drawSimpleLineChart('visitors-chart', [42, 58, 51, 76, 68, 92, 84], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    drawSimpleBarChart('traffic-chart', [
        { label: 'Direct', value: 48 },
        { label: 'LinkedIn', value: 32 },
        { label: 'Search', value: 24 },
        { label: 'Referral', value: 16 }
    ]);

    // Stat period filter buttons
    document.querySelectorAll('.stat-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.stat-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const period = btn.getAttribute('data-period');
            if (period === '7') {
                document.getElementById('total-visitors').textContent = '320';
                document.getElementById('unique-visitors').textContent = '245';
                document.getElementById('page-views').textContent = '890';
            } else if (period === '30') {
                document.getElementById('total-visitors').textContent = '780';
                document.getElementById('unique-visitors').textContent = '560';
                document.getElementById('page-views').textContent = '2,140';
            } else {
                document.getElementById('total-visitors').textContent = '1,240';
                document.getElementById('unique-visitors').textContent = '890';
                document.getElementById('page-views').textContent = '3,420';
            }
        });
    });

    // 14. Settings Management
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Admin settings saved.');
        });
    }
});