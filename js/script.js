document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const questionContainer = document.getElementById('question-container');
    const successContainer = document.getElementById('success-container');
    const submitMessageBtn = document.getElementById('submitMessage');
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const messagesList = document.getElementById('messages-list');
    
    // Move the "No" button away when mouse hovers over it
    noButton.addEventListener('mouseover', moveNoButton);
    
    // Show success page when "Yes" is clicked
    yesButton.addEventListener('click', function() {
        questionContainer.style.display = 'none';
        successContainer.style.display = 'block';
        // Load sample messages
        loadMessages();
    });
    
    // Handle message submission
    submitMessageBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        
        if (name && message) {
            // Add message to local storage
            saveMessage(name, message);
            
            // Add message to the list
            addMessageToList(name, message, new Date());
            
            // Clear inputs
            nameInput.value = '';
            messageInput.value = '';
            
            // Show success message
            alert('Your love message has been saved! ❤️');
        } else {
            alert('Please fill in both name and message fields.');
        }
    });
    
    // Function to move the "No" button
    function moveNoButton() {
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noButton.style.position = 'fixed';
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
    }
    
    // Function to save message to local storage
    function saveMessage(name, message) {
        const messages = getMessages();
        messages.push({
            name: name,
            message: message,
            date: new Date().toISOString()
        });
        
        localStorage.setItem('loveMessages', JSON.stringify(messages));
    }
    
    // Function to get messages from local storage
    function getMessages() {
        const messagesJSON = localStorage.getItem('loveMessages');
        return messagesJSON ? JSON.parse(messagesJSON) : [];
    }
    
    // Function to load messages
    function loadMessages() {
        // Clear current messages
        messagesList.innerHTML = '';
        
        // Get messages from local storage
        const messages = getMessages();
        
        // If no messages, add some sample ones
        if (messages.length === 0) {
            // Sample messages
            const sampleMessages = [
                {
                    name: "Sofia",
                    message: "You make my heart skip a beat every time I see you!",
                    date: new Date(2023, 5, 15).toISOString()
                },
                {
                    name: "Ahmed",
                    message: "My love for you grows stronger each day.",
                    date: new Date(2023, 6, 20).toISOString()
                },
                {
                    name: "Maria",
                    message: "You are the sunshine that brightens my darkest days.",
                    date: new Date(2023, 7, 5).toISOString()
                }
            ];
            
            // Save sample messages
            localStorage.setItem('loveMessages', JSON.stringify(sampleMessages));
            
            // Add sample messages to the list
            sampleMessages.forEach(message => {
                addMessageToList(message.name, message.message, new Date(message.date));
            });
        } else {
            // Add saved messages to the list
            messages.forEach(message => {
                addMessageToList(message.name, message.message, new Date(message.date));
            });
        }
    }
    
    // Function to add a message to the list
    function addMessageToList(name, message, date) {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        
        const messageName = document.createElement('div');
        messageName.className = 'message-name';
        messageName.textContent = name;
        
        const messageDate = document.createElement('div');
        messageDate.className = 'message-date';
        messageDate.textContent = formatDate(date);
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = message;
        
        messageCard.appendChild(messageName);
        messageCard.appendChild(messageDate);
        messageCard.appendChild(messageText);
        
        messagesList.appendChild(messageCard);
    }
    
    // Function to format date
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }
});