document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loading-container');
    const contentContainer = document.getElementById('content-container');
    const bearsImage = document.getElementById('bearsImage');
    
    // Simulate loading time
    setTimeout(function() {
        // Hide loading screen
        loadingContainer.style.display = 'none';
        
        // Show content with animation
        contentContainer.classList.remove('hidden');
        setTimeout(() => {
            contentContainer.classList.add('active');
        }, 100);
        
        // Add animations to the bears image if it exists
        if (bearsImage) {
            bearsImage.classList.add('float-animation');
        }
        
    }, 2000); // 2 seconds loading time
});