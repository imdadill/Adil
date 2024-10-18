
document.addEventListener('DOMContentLoaded', function() {
    const slides1 = document.querySelectorAll('.slide1');
    const bullets1 = document.querySelectorAll('.bullet1');
    let currentSlide1 = 0;

    function showSlide(index) {
        slides1.forEach((slide1, i) => {
            slide1.classList.toggle('active', i === index);
            bullets1[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide1 = (currentSlide1 + 1) % slides1.length;
        showSlide(currentSlide1);
    }

    bullets1.forEach((bullet1, index) => {
        bullet1.addEventListener('click', () => {
            currentSlide1 = index;
            showSlide(currentSlide1);
        });
    });

    setInterval(nextSlide, 5000); // Change slide every 5 seconds
});

// card section
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Show default product (Men's Wallet)
    showProducts('mens-wallet');

    // Filter button click event
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            showProducts(category);
        });
    });

    // Initialize carousel for each card without hover effects
    productCards.forEach(card => {
        resetCarousel(card);
    });

    function showProducts(category) {
        productCards.forEach(card => {
            if (card.classList.contains(category)) {
                card.classList.remove('hidden');
                resetCarousel(card);  // Reset carousel for the displayed product
            } else {
                card.classList.add('hidden');
            }
        });
    }

    function startCarousel(card) {
        const carouselPages = card.querySelectorAll('.carousel-page');
        let currentIndex = 0; // Track current index for this specific card

        card.autoSlideTimeout = setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselPages.length; // Loop back to the first page
            updateCarousel(carouselPages, currentIndex);
            updateBullets(card.querySelector('.bullets'), currentIndex); // Update bullets
        }, 6000);  // Slide every 6 seconds
    }

    function updateCarousel(carouselPages, currentIndex) {
        carouselPages.forEach((page, index) => {
            page.classList.remove('active');
            if (index === currentIndex) {
                page.classList.add('active');
            }
        });
    }

    function updateBullets(bulletsContainer, activeIndex) {
        const allBullets = bulletsContainer.querySelectorAll('.bullet');
        allBullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === activeIndex);
        });
    }

    function resetCarousel(card) {
        clearInterval(card.autoSlideTimeout); // Clear any existing timeout for this card
        const carouselPages = card.querySelectorAll('.carousel-page');
        const bullets = card.querySelector('.bullets');
        let currentIndex = 0; // Reset currentIndex to the first page

        updateCarousel(carouselPages, currentIndex); // Show the first page
        updateBullets(bullets, currentIndex); // Reset bullets to the first

        // Add bullet click event for navigation
        const bulletElements = bullets.querySelectorAll('.bullet');
        bulletElements.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                clearInterval(card.autoSlideTimeout); // Stop auto sliding
                currentIndex = index;  // Update currentIndex based on clicked bullet
                updateCarousel(carouselPages, currentIndex);
                updateBullets(bullets, currentIndex);
                startCarousel(card); // Restart auto sliding
            });
        });

        startCarousel(card); // Start carousel for this card
    }

    // Intersection Observer to start/stop carousel based on visibility
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the card is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const card = entry.target;
            if (entry.isIntersecting) {
                startCarousel(card); // Start carousel when card is in view
            } else {
                clearInterval(card.autoSlideTimeout); // Stop carousel when card is out of view
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    productCards.forEach(card => {
        observer.observe(card); // Observe each product card
    });
});
