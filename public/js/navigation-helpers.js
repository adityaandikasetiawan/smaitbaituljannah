// Navigation Helpers - Back to Top Button and Breadcrumb functionality

(function() {
    'use strict';

    // Back to Top Button functionality
    function initBackToTop() {
        // Create back to top button if it doesn't exist
        let backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) {
            backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.innerHTML = '↑';
            backToTopBtn.setAttribute('aria-label', 'Kembali ke atas');
            backToTopBtn.setAttribute('title', 'Kembali ke atas');
            document.body.appendChild(backToTopBtn);
        }

        // Show/hide button based on scroll position
        function toggleBackToTop() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Smooth scroll to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Event listeners
        window.addEventListener('scroll', toggleBackToTop);
        backToTopBtn.addEventListener('click', scrollToTop);

        // Initial check
        toggleBackToTop();
    }

    // Reading Progress Bar
    function initReadingProgress() {
        let progressBar = document.querySelector('.reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            document.body.appendChild(progressBar);
        }

        function updateProgress() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }

    // Breadcrumb Auto-generation
    function initBreadcrumb() {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (!breadcrumbContainer) return;

        // Get current path
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment !== '');
        
        // Clear existing breadcrumb
        breadcrumbContainer.innerHTML = '';

        // Add home link
        const homeItem = document.createElement('li');
        homeItem.className = 'breadcrumb-item';
        homeItem.innerHTML = '<a href="/">Beranda</a>';
        breadcrumbContainer.appendChild(homeItem);

        // Add path segments
        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const item = document.createElement('li');
            
            if (index === pathSegments.length - 1) {
                // Last item (current page)
                item.className = 'breadcrumb-item active';
                item.textContent = formatBreadcrumbText(segment);
            } else {
                // Intermediate items
                item.className = 'breadcrumb-item';
                item.innerHTML = `<a href="${currentPath}">${formatBreadcrumbText(segment)}</a>`;
            }
            
            breadcrumbContainer.appendChild(item);
        });
    }

    // Format breadcrumb text
    function formatBreadcrumbText(segment) {
        // Convert URL segment to readable text
        const textMap = {
            'profil': 'Profil',
            'sejarah': 'Sejarah',
            'visi-misi': 'Visi & Misi',
            'struktur': 'Struktur Organisasi',
            'program': 'Program',
            'unggulan': 'Program Unggulan',
            'akademik': 'Akademik',
            'ekstrakurikuler': 'Ekstrakurikuler',
            'layanan': 'Layanan',
            'ppdb': 'PPDB',
            'berita': 'Berita',
            'galeri': 'Galeri',
            'kontak': 'Kontak'
        };

        return textMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Scroll Indicator
    function initScrollIndicator() {
        const sections = document.querySelectorAll('section[id], .section[id]');
        if (sections.length === 0) return;

        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'scroll-indicator-dot';
            dot.setAttribute('data-section', section.id);
            dot.setAttribute('title', section.getAttribute('data-title') || `Bagian ${index + 1}`);
            
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });
            
            indicator.appendChild(dot);
        });

        document.body.appendChild(indicator);

        // Update active dot on scroll
        function updateActiveSection() {
            const scrollPos = window.pageYOffset + 100;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const dot = indicator.children[index];
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveSection);
        updateActiveSection();
    }

    // Skip to content functionality
    function initSkipToContent() {
        let skipLink = document.querySelector('.skip-to-content');
        if (!skipLink) {
            skipLink = document.createElement('a');
            skipLink.className = 'skip-to-content';
            skipLink.href = '#main-content';
            skipLink.textContent = 'Lewati ke konten utama';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Ensure main content has an ID
        const mainContent = document.querySelector('main, .main-content, #main-content');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }

    // Smooth scroll for all anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize all navigation helpers when DOM is ready
    function init() {
        initBackToTop();
        initReadingProgress();
        initBreadcrumb();
        initScrollIndicator();
        initSkipToContent();
        initSmoothScroll();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();