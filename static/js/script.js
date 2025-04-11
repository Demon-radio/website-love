document.addEventListener('DOMContentLoaded', function() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const questionContainer = document.getElementById('question-container');
    const successContainer = document.getElementById('success-container');
    const fallingHeartsContainer = document.getElementById('falling-hearts-container');
    const bearsImage = document.getElementById('bearsImage');
    const heartImage = document.getElementById('heartImage');
    const bearHugImage = document.getElementById('bearHugImage');
    
    // Add float animation to the bears image
    bearsImage.classList.add('float-animation');
    
    // Make the No button run away
    noButton.addEventListener('mouseover', moveNoButton);
    noButton.addEventListener('click', moveNoButton);
    
    function moveNoButton() {
        // Calculate random position within the viewport
        const maxWidth = window.innerWidth - noButton.offsetWidth;
        const maxHeight = window.innerHeight - noButton.offsetHeight;
        
        // Make sure the button doesn't go off-screen
        const randomX = Math.max(20, Math.min(maxWidth - 20, Math.random() * maxWidth));
        const randomY = Math.max(20, Math.min(maxHeight - 20, Math.random() * maxHeight));
        
        // Apply new position
        noButton.style.position = 'fixed';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
        
        // Add a quick animation
        noButton.classList.add('shake');
        setTimeout(() => {
            noButton.classList.remove('shake');
        }, 500);
    }
    
    // Handle Yes button click
    yesButton.addEventListener('click', function() {
        // Hide question container
        questionContainer.classList.add('hidden');
        
        // Show success container
        successContainer.classList.remove('hidden');
        successContainer.classList.add('active');
        
        // Show falling hearts
        startFallingHearts();
        
        // Add heart beat animation to heart image
        heartImage.classList.add('heart-beat');
        
        // Add float animation to bear hug image
        bearHugImage.classList.add('float-animation');
    });
    
    function startFallingHearts() {
        fallingHeartsContainer.classList.remove('hidden');
        
        // Create falling hearts
        const createHeart = () => {
            const heart = document.createElement('object');
            heart.data = "/static/images/small_heart.svg";
            heart.type = "image/svg+xml";
            heart.classList.add('falling-heart');
            
            // Random position horizontally
            const leftPos = Math.random() * 100;
            heart.style.left = `${leftPos}vw`;
            
            // Random fall duration
            const fallDuration = 3 + Math.random() * 5;
            heart.style.animationDuration = `${fallDuration}s`;
            
            fallingHeartsContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, fallDuration * 1000);
        };
        
        // Create initial hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(createHeart, i * 300);
        }
        
        // Continue creating hearts
        let heartInterval = setInterval(createHeart, 500);
        
        // Stop after a while to prevent performance issues
        setTimeout(() => {
            clearInterval(heartInterval);
            
            // Create a few more hearts occasionally
            heartInterval = setInterval(createHeart, 2000);
        }, 15000);
    }
});
