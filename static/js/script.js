document.addEventListener('DOMContentLoaded', function() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const bearsImage = document.getElementById('bearsImage');
    
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
    
    // Handle Yes button click - redirect to success page
    yesButton.addEventListener('click', function() {
        window.location.href = '/success';
    });
});
