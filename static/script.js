// Function to validate the contact form before submission
function validateForm() {
    // Get values from input fields
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Check if name is empty
    if (name.trim() == '') {
        alert('Please enter your name');
        return false;
    }

    // Check if phone number is empty
    if (phone.trim() == '') {
        alert('Please enter your phone number');
        return false;
    }

    // Check if email is empty
    if (email.trim() == '') {
        alert('Please enter your email');
        return false;
    }

    // Check if message is empty
    if (message.trim() == '') {
        alert('Please enter your message');
        return false;
    }

    // All fields are filled, return true for form submission
    return true;
}


// Function to generate a random CAPTCHA code
function generateCaptcha() {
    const canvas = document.getElementById('captcha-canvas');
    canvas.classList.add('fade-out');

    setTimeout(() => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let captchaString = '';
        
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            captchaString += chars[randomIndex];
        }

        sessionStorage.setItem('captchaText', captchaString);
        drawCaptcha(captchaString);

        // Clear input
        const captchaInput = document.getElementById('captcha-input');
        if (captchaInput) {
            captchaInput.value = '';
        }

        // Fade in
        canvas.classList.remove('fade-out');
    }, 150); // short delay for smooth fade transition
}


// Function to draw the CAPTCHA on canvas with noise
function drawCaptcha(text) {
    const canvas = document.getElementById('captcha-canvas');
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill background
    ctx.fillStyle = '#f7f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add noise (dots)
    for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.fillStyle = getRandomColor(0.5);
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add noise (lines)
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.strokeStyle = getRandomColor(0.5);
        ctx.lineWidth = 1;
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    
    // Set text properties
    ctx.font = 'bold 24px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw each character with slight rotation for added security
    const charWidth = canvas.width / (text.length + 1);
    for (let i = 0; i < text.length; i++) {
        ctx.save();
        ctx.translate(charWidth * (i + 1), canvas.height / 2);
        
        // Random slight rotation
        const rotation = (Math.random() - 0.5) * 0.4;
        ctx.rotate(rotation);
        
        // Random color for each character
        ctx.fillStyle = getRandomDarkColor();
        
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
    }
}

// Generate a random color with given opacity
function getRandomColor(opacity = 1) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Generate a random dark color (for better readability)
function getRandomDarkColor() {
    const r = Math.floor(Math.random() * 100);
    const g = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to validate the CAPTCHA
function validateCaptcha() {
    const userInput = document.getElementById('captcha-input').value;
    const captchaText = sessionStorage.getItem('captchaText');
    
    return userInput === captchaText;
}

const modal = document.getElementById('captcha-modal');
const closeBtn = modal.querySelector('.close');
const container = document.querySelector('.container'); // Adjust to your main container selector

function showCaptchaModal() {
    modal.style.display = 'block';
    container.classList.add('blur'); // Add blur to background
  }
  
  function closeCaptchaModal() {
    modal.style.display = 'none';
    container.classList.remove('blur'); // Remove blur
  }
  
  // Close modal when clicking the close button
  closeBtn.addEventListener('click', closeCaptchaModal);
  

function validateForm() {
    if (!validateCaptcha()) {
      showCaptchaModal();
      generateCaptcha(); // Generate a new captcha
      return false;
    }
    return true;
  }

// Initialize CAPTCHA when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Generate the initial captcha
    generateCaptcha();
    
    // Add event listener to refresh button
    document.getElementById('refresh-captcha').addEventListener('click', function() {
        generateCaptcha();
    });
    
    // Attach the validation function to the form
    document.getElementById('submit').onsubmit = validateForm;
});


  