// Additional JavaScript functionality for enhanced user experience with wabi-sabi aesthetic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initScrollEffects();
    initAnimations();
    initAccessibility();
    initSearchFunctionality();
    initOrganicEffects();
    initWabiSabiInteractions();
    initOrganicCursor();
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
    
    // Add organic button effects
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
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
    document.head.appendChild(buttonStyle);
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

// New organic effects for wabi-sabi aesthetic
function initOrganicEffects() {
    // Add subtle texture overlay animation
    const textureStyle = document.createElement('style');
    textureStyle.textContent = `
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(circle at 25% 25%, transparent 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, rgba(160, 82, 61, 0.03) 1px, transparent 1px);
            background-size: 50px 50px, 80px 80px;
            pointer-events: none;
            z-index: -1;
            animation: organic-texture 20s linear infinite;
        }
        
        @keyframes organic-texture {
            0% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(-10px) translateY(-5px); }
            50% { transform: translateX(-5px) translateY(-10px); }
            75% { transform: translateX(-15px) translateY(-2px); }
            100% { transform: translateX(0) translateY(0); }
        }
        
        .staggered-fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .staggered-fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(textureStyle);
    
    // Add staggered animations to grid items
    const gridItems = document.querySelectorAll('.card, .research-item, .course-item, .project-card, .cv-item');
    gridItems.forEach((item, index) => {
        item.classList.add('staggered-fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Trigger staggered animations on scroll
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            }
        });
    }, { threshold: 0.1 });
    
    gridItems.forEach(item => staggerObserver.observe(item));
}

// Wabi-sabi specific interactions
function initWabiSabiInteractions() {
    // Add organic hover effects to navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = `translateY(-2px) rotate(${Math.random() * 2 - 1}deg)`;
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    // Add organic loading states for interactive elements
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                // Create organic ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: organic-ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            }
        });
    });
    
    // Add organic ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes organic-ripple {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(0.5) rotate(180deg);
                opacity: 0.6;
            }
            100% {
                transform: scale(1) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Add subtle parallax to background elements
    const parallaxElements = document.querySelectorAll('.hero, .card, .project-card');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * (0.1 + index * 0.02);
            const rotation = Math.sin(scrolled * 0.001) * 0.5;
            element.style.transform = `translateY(${rate}px) rotate(${rotation}deg)`;
        });
    });
    
    // Add organic focus transitions
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Add organic cursor effects and final polish
function initOrganicCursor() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.className = 'organic-cursor';
    cursorFollower.className = 'organic-cursor-follower';
    
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .organic-cursor {
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .organic-cursor-follower {
            position: fixed;
            width: 24px;
            height: 24px;
            border: 1px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.3;
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .organic-cursor.hover {
            transform: scale(1.5);
            background: var(--accent-color);
        }
        
        .organic-cursor-follower.hover {
            transform: scale(1.8);
            border-color: var(--accent-color);
            opacity: 0.6;
        }
        
        @media (hover: none) and (pointer: coarse) {
            .organic-cursor,
            .organic-cursor-follower {
                display: none;
            }
        }
    `;
    document.head.appendChild(cursorStyle);
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    // Track mouse movement
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function updateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX - 12 + 'px';
        cursorFollower.style.top = followerY - 12 + 'px';
        
        requestAnimationFrame(updateFollower);
    }
    updateFollower();
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .card, .project-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// Enhanced accessibility features
function enhanceAccessibility() {
    // Add reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add high contrast mode support
    const highContrast = window.matchMedia('(prefers-contrast: high)');
    if (highContrast.matches) {
        document.documentElement.classList.add('high-contrast');
        const contrastStyle = document.createElement('style');
        contrastStyle.textContent = `
            .high-contrast {
                --primary-color: #000000;
                --secondary-color: #ffffff;
                --accent-color: #0066cc;
                --background: #ffffff;
                --surface: #f5f5f5;
                --text-primary: #000000;
                --text-secondary: #333333;
                --border: #000000;
            }
        `;
        document.head.appendChild(contrastStyle);
    }
}

// Initialize final enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion before adding cursor effects
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && window.innerWidth > 768) {
        initOrganicCursor();
    }
    
    enhanceAccessibility();
});
