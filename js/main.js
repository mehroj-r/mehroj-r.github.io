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
        this.setupTechStackInteractions(); // New method for tech stack icons
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
            link.classList.remove('text-purple-400', 'active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-purple-400', 'active');
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

                    // If this is a project card, apply staggered animation to siblings
                    if (entry.target.classList.contains('project-card')) {
                        const parent = entry.target.parentElement;
                        const siblings = Array.from(parent.children);
                        const index = siblings.indexOf(entry.target);

                        siblings.forEach((sibling, i) => {
                            if (i > index) {
                                setTimeout(() => {
                                    this.animateElement(sibling);
                                }, (i - index) * 150);
                            }
                        });
                    }
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
        // Check if already animated
        if (element.classList.contains('animated')) return;

        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.classList.add('animated');
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
        // Find the typewriter element
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        // List of phrases to cycle through
        const phrases = [
            'Building robust APIs and scalable backend systems',
            'Creating secure authentication and authorization',
            'Designing efficient database schemas',
            'Developing RESTful web services'
        ];

        // Set initial state and starting phrase
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        // Save the original text as first phrase if needed
        const originalText = typewriterElement.textContent.trim();
        if (originalText && !phrases.includes(originalText)) {
            phrases.unshift(originalText);
        }

        // Clear initial content
        typewriterElement.innerHTML = '<span class="text-content"></span><span class="cursor">|</span>';
        const textContent = typewriterElement.querySelector('.text-content');

        // Function to type and delete text
        function typeAndDelete() {
            // Get current phrase
            const currentPhrase = phrases[currentPhraseIndex];

            // Set the text content based on whether we're typing or deleting
            if (isDeleting) {
                textContent.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                textContent.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            // Calculate typing speed (faster for deleting)
            let typingSpeed = isDeleting ? 50 : 100;

            // If we've finished typing the full phrase
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                // Pause at the end before starting to delete
                typingSpeed = 1500;
                isDeleting = true;
            }
            // If we've deleted the entire phrase
            else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                // Move to next phrase
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                // Pause before starting new phrase
                typingSpeed = 500;
            }

            // Continue the typing/deleting loop
            setTimeout(typeAndDelete, typingSpeed);
        }

        // Start the typing effect after a short delay
        setTimeout(typeAndDelete, 1000);
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Parallax for hero section background elements
            document.querySelectorAll('#home .absolute.blur-3xl, #home .absolute.blur-2xl').forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = scrollY * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // New method for tech stack interactions
    setupTechStackInteractions() {
        const techIcons = document.querySelectorAll('.tech-icon');

        techIcons.forEach((icon, index) => {
            // Add staggered entrance animation
            setTimeout(() => {
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0)';
            }, 1500 + (index * 150));

            // Add hover effects
            icon.addEventListener('mouseenter', () => {
                icon.classList.add('animate-pulse');

                // Create a subtle ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'absolute inset-0 rounded-lg';
                ripple.style.background = 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)';
                ripple.style.transform = 'scale(0)';
                ripple.style.opacity = '0';
                ripple.style.transition = 'all 0.6s ease-out';

                icon.style.position = 'relative';
                icon.appendChild(ripple);

                setTimeout(() => {
                    ripple.style.transform = 'scale(1.5)';
                    ripple.style.opacity = '1';
                }, 10);

                setTimeout(() => {
                    ripple.style.opacity = '0';
                    setTimeout(() => ripple.remove(), 600);
                }, 600);
            });

            icon.addEventListener('mouseleave', () => {
                icon.classList.remove('animate-pulse');
            });
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Handle window resize events
window.addEventListener('resize', Utils.debounce(() => {
    // Recalculate any size-dependent elements
    console.log('Window resized');
}, 250));
