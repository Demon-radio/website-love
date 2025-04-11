document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loading-container');
    const contentContainer = document.getElementById('content-container');
    const phoneImage = document.getElementById('phoneImage');
    const hugImage = document.getElementById('hugImage');
    
    // Simulate loading time
    setTimeout(function() {
        // Hide loading screen
        loadingContainer.style.display = 'none';
        
        // Show content with animation
        contentContainer.classList.remove('hidden');
        setTimeout(() => {
            contentContainer.classList.add('active');
        }, 100);
        
        // Add animations to images
        phoneImage.classList.add('float-animation');
        
        // Wait a bit before showing the hug image
        setTimeout(() => {
            hugImage.classList.add('float-animation');
        }, 2000);
        
    }, 3000); // 3 seconds loading time
});