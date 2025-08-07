let currentSlide = 0;
const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.teacher-card');
const totalCards = cards.length;
const cardsToShow = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);

// Clone first and last few cards for infinite effect
function setupInfiniteCarousel() {
    // Clone first few cards and append to end
    for (let i = 0; i < cardsToShow; i++) {
        const clone = cards[i].cloneNode(true);
        carousel.appendChild(clone);
    }
    
    // Clone last few cards and prepend to beginning
    for (let i = totalCards - cardsToShow; i < totalCards; i++) {
        const clone = cards[i].cloneNode(true);
        carousel.insertBefore(clone, carousel.firstChild);
    }
    
    // Start from the first real card (skip cloned ones)
    currentSlide = cardsToShow;
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const translateX = currentSlide * (300 + 20); // card width + gap
    carousel.style.transition = 'transform 0.3s ease';
    carousel.style.transform = `translateX(-${translateX}px)`;
}

function moveCarousel(direction) {
    currentSlide += direction;
    updateCarouselPosition();
    
    // Handle infinite loop
    setTimeout(() => {
        if (currentSlide >= totalCards + cardsToShow) {
            // Jump to beginning without animation
            currentSlide = cardsToShow;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${currentSlide * (300 + 20)}px)`;
        } else if (currentSlide < cardsToShow) {
            // Jump to end without animation
            currentSlide = totalCards - 1 + cardsToShow;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${currentSlide * (300 + 20)}px)`;
        }
    }, 300);
}

// Initialize infinite carousel
setupInfiniteCarousel();

// Auto-slide every 4 seconds
setInterval(() => {
    moveCarousel(1);
}, 4000);

// Handle window resize
window.addEventListener('resize', () => {
    location.reload(); // Simple solution for responsive behavior
});
