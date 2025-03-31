// List of random names for birthday celebration
const names = [
    "Alex", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie",
    "Drew", "Quinn", "Blake", "Avery", "Skyler", "Parker", "Reese", "Finley"
];

// List of random profile images (using Unsplash API for random images)
const imageUrls = [
    "https://picsum.photos/400/400?random=1",
    "https://picsum.photos/400/400?random=2",
    "https://picsum.photos/400/400?random=3",
    "https://picsum.photos/400/400?random=4"
];

// Function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to trigger confetti using canvas-confetti library
function triggerConfetti() {
    const defaults = { 
        startVelocity: 45, 
        spread: 360, 
        ticks: 200, 
        zIndex: 0,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star', 'circle', 'square'],
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Run confetti continuously
    setInterval(function() {
        // Left side burst
        confetti({
            ...defaults,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        // Right side burst
        confetti({
            ...defaults,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
        // Center burst
        confetti({
            ...defaults,
            origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 }
        });
    }, 300); // More frequent bursts
}

// Initialize the birthday celebration
function initBirthdayCelebration() {
    // Set random name
    const nameElement = document.getElementById('birthdayName');
    nameElement.textContent = getRandomItem(names);

    // Set random image
    const imageElement = document.getElementById('birthdayImage');
    imageElement.src = getRandomItem(imageUrls);

    // Trigger confetti animation
    triggerConfetti();

    // Add some fun hover effects to the profile image
    const profileImage = document.querySelector('.profile-image');
    profileImage.addEventListener('mouseover', () => {
        profileImage.style.transform = 'scale(1.05) rotate(5deg)';
        profileImage.style.transition = 'transform 0.3s ease';
    });

    profileImage.addEventListener('mouseout', () => {
        profileImage.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initBirthdayCelebration); 