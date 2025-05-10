document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate position of target section, considering fixed header height
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open after clicking a link
                const navUl = document.querySelector('nav ul');
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('active');
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const animatedSections = document.querySelectorAll('.animated-section');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
            // Optional: remove 'visible' class if section scrolls out of view
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});