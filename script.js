// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: false,
        mirror: false
    });

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sendAnother = document.getElementById('sendAnother');
    const allNavLinks = navLinks.querySelectorAll('a');

    // Toggle mobile menu
    menuBtn.addEventListener('click', function() {
        const isExpanded = navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', isExpanded);
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars', !isExpanded);
        icon.classList.toggle('fa-times', isExpanded);
    });

    // Close mobile menu when clicking a link
    allNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

 // Form submission handler
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevents page refresh

        const submitBtn = document.querySelector('.submit-btn');
        const loader = document.createElement('div');
        loader.classList.add('loader-container');
        loader.innerHTML = `
            <div class="mailbox">
                <div class="mailbox-slot"></div>
                <div class="postcard"></div>
            </div>
            <p class="sending-text">Sending...</p>
        `;

        // Disable button and show loader
        submitBtn.disabled = true;
        submitBtn.innerHTML = ''; // Remove text
        submitBtn.appendChild(loader); // Show animated loader

        // Send form data
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: "POST",
            body: formData
        }).then(response => {
            if (response.ok) {
                formSuccess.classList.add('active'); // Show success message
                contactForm.reset(); // Reset form fields
            } else {
                alert("Something went wrong. Please try again.");
            }
        }).catch(error => {
            console.error("Form submission error:", error);
            alert("Network error. Please try again later.");
        }).finally(() => {
            // Restore button after submission
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
        });
    });
}

// Send another message button
if (sendAnother) {
    sendAnother.addEventListener('click', function() {
        formSuccess.classList.remove('active');
    });
}


    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 79, // Navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const nameSpan = heroTitle.querySelector('span');
        const nameText = nameSpan.textContent;
        nameSpan.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(function() {
            if (i < nameText.length) {
                nameSpan.textContent += nameText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 150);
    }

    // Project hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });

    // Add counter animation for years of experience (if added to the page)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const steps = 50;
            const stepValue = target / steps;
            let current = 0;
            
            const timer = setInterval(function() {
                current += stepValue;
                counter.textContent = Math.round(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, duration / steps);
        });
    }

    // Run counter animation when scrolled into view
    const observerOptions = {
        threshold: 0.2 // Trigger animation when 20% of the element is visible
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter-container')) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    const counterContainer = document.querySelector('.counter-container');
    if (counterContainer) {
        observer.observe(counterContainer);
    }

    // Particles background effect for hero section (optional)
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        createParticles(heroSection, 20); // Reduced particle count
    }

    function createParticles(container, count = 30) {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles');
        container.appendChild(particlesContainer);
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const size = Math.random() * 10 + 2;
            const opacity = Math.random() * 0.5 + 0.1;
            const duration = Math.random() * 20 + 10;
            
            particle.style.cssText = `
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                opacity: ${opacity};
                animation-duration: ${duration}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function restartBlocks() {
        document.querySelectorAll('.block').forEach((block, index) => {
            block.style.animation = 'none'; // Reset animation
            void block.offsetWidth; // Trigger reflow
            block.style.animation = `stackBlocks 1s linear forwards ${index * 0.2}s`;
        });
    }

    setInterval(restartBlocks, 5 * 1000); // Restart every 5 sec
});