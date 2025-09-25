// Portfolio Website JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupNavigation();
        this.setupTypingEffect();
        this.setupParallaxEffect();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Smooth scrolling for hero buttons
        document.querySelectorAll('[data-scroll-to]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetSel = e.currentTarget.getAttribute('data-scroll-to');
                const target = document.querySelector(targetSel);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll.bind(this));

        // Form submission
        const contactForm = document.querySelector('form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmission.bind(this));
        }

        // Project card hover effects
        this.setupProjectCardEffects();
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-black/40');
                navbar.classList.remove('bg-black/20');
            } else {
                navbar.classList.add('bg-black/20');
                navbar.classList.remove('bg-black/40');
            }
        }

        // Update active nav links
        this.updateActiveNavLinks();
    }

    updateActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('a[href^="#"]');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-blue-400', 'active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-400', 'active');
            }
        });
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const name = formData.get('name') || e.target.querySelector('input[type="text"]')?.value;
        const email = formData.get('email') || e.target.querySelector('input[type="email"]')?.value;
        const message = formData.get('message') || e.target.querySelector('textarea')?.value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset form
        e.target.reset();
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }

    setupProjectCardEffects() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.transition = 'transform 0.3s ease-out';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupNavigation() {
        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }

    setupTypingEffect() {
        const subtitle = document.querySelector('section#home p');
        if (!subtitle) return;

        const text = 'Creative Developer & Digital Innovator';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                subtitle.innerHTML = text.substring(0, i + 1) + '<span class="animate-pulse">|</span>';
                i++;
                setTimeout(typeWriter, 100);
            } else {
                subtitle.innerHTML = text;
            }
        };

        // Start typing effect after initial animation
        setTimeout(() => {
            subtitle.innerHTML = '';
            typeWriter();
        }, 1500);
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.animate-float');

            shapes.forEach((shape, index) => {
                const rate = scrolled * -0.5 * (index + 1);
                shape.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Handle window resize events
window.addEventListener('resize', Utils.debounce(() => {
    // Recalculate any size-dependent elements
    console.log('Window resized');
}, 250));
