// Additional JavaScript functionality for enhanced user experience with wabi-sabi aesthetic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initScrollEffects();
    initAnimations();
    initAccessibility();
    initSearchFunctionality();
});

// Scroll effects with organic animations
function initScrollEffects() {
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.card, .research-item, .course-item, .project-card, .cv-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Animation initialization with wabi-sabi organic effects
function initAnimations() {
    // Add CSS for organic scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px) rotate(-0.5deg);
            transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                       transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        
        .animate-on-scroll:nth-child(even) {
            transform: translateY(30px) rotate(0.3deg);
        }
        
        .card:hover, .project-card:hover {
            transform: translateY(-8px) rotate(0.5deg) scale(1.02);
        }
        
        .research-item:hover, .course-item:hover {
            transform: translateX(8px) rotate(0.3deg);
        }
    `;
    document.head.appendChild(style);
    
    // Add organic parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add gentle movement to cards on mouse move
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.card, .project-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - cardCenterX) * 0.01;
            const deltaY = (e.clientY - cardCenterY) * 0.01;
            
            card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`;
        });
    });
}
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Accessibility enhancements
function initAccessibility() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Search functionality for CV and research pages
function initSearchFunctionality() {
    if (window.location.pathname.includes('cv.html') || 
        window.location.pathname.includes('research.html')) {
        
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 500;
            background: var(--background);
            padding: 10px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border);
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search this page...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            border: 1px solid var(--border);
            padding: 8px 12px;
            border-radius: var(--radius-sm);
            width: 200px;
            font-size: 14px;
        `;
        
        searchContainer.appendChild(searchInput);
        document.body.appendChild(searchContainer);
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('.cv-item, .research-item, .course-item, .card');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (searchTerm === '' || text.includes(searchTerm)) {
                    element.style.display = '';
                    element.classList.remove('search-hidden');
                } else {
                    element.style.display = 'none';
                    element.classList.add('search-hidden');
                }
            });
            
            // Show/hide section headers based on whether they have visible content
            const sections = document.querySelectorAll('.cv-section, .content-section');
            sections.forEach(section => {
                const visibleItems = section.querySelectorAll('.cv-item:not(.search-hidden), .research-item:not(.search-hidden), .course-item:not(.search-hidden), .card:not(.search-hidden)');
                const sectionHeader = section.querySelector('h2');
                if (searchTerm !== '' && visibleItems.length === 0 && sectionHeader) {
                    sectionHeader.style.opacity = '0.3';
                } else if (sectionHeader) {
                    sectionHeader.style.opacity = '';
                }
            });
        });
        
        // Hide search on small screens
        function toggleSearch() {
            if (window.innerWidth < 768) {
                searchContainer.style.display = 'none';
            } else {
                searchContainer.style.display = 'block';
            }
        }
        
        toggleSearch();
        window.addEventListener('resize', toggleSearch);
    }
}

// Print optimization
window.addEventListener('beforeprint', function() {
    // Expand any collapsed sections
    const collapsedElements = document.querySelectorAll('.collapsed');
    collapsedElements.forEach(el => el.classList.remove('collapsed'));
    
    // Remove search elements
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.style.display = 'none';
    }
});

window.addEventListener('afterprint', function() {
    // Restore search elements
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && window.innerWidth >= 768) {
        searchContainer.style.display = 'block';
    }
});

// Performance optimization: lazy load images if any are added
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Call lazy loading initialization
initLazyLoading();
