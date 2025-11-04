// Jack's Lounge - Static HTML JavaScript

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
  // Initialize accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    
    trigger.addEventListener('click', function() {
      // Toggle active class
      const isActive = item.classList.contains('active');
      
      // Close all items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Contact Form Handler
function handleContactSubmit(event) {
  event.preventDefault();
  
  // Get form values
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Clear previous errors
  document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
  
  // Validation
  let hasErrors = false;
  
  if (!firstName) {
    showError('firstName', 'First name is required');
    hasErrors = true;
  }
  
  if (!lastName) {
    showError('lastName', 'Last name is required');
    hasErrors = true;
  }
  
  if (!email) {
    showError('email', 'Email is required');
    hasErrors = true;
  } else if (!isValidEmail(email)) {
    showError('email', 'Invalid email address');
    hasErrors = true;
  }
  
  if (!subject) {
    showError('subject', 'Subject is required');
    hasErrors = true;
  }
  
  if (!message) {
    showError('message', 'Message is required');
    hasErrors = true;
  }
  
  if (hasErrors) {
    return false;
  }
  
  // In a real implementation, you would send this to a server
  console.log('Contact form submitted:', {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message
  });
  
  // Show success message
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.style.display = 'block';
    
    // Clear form
    document.getElementById('contactForm').reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  }
  
  return false;
}

function showError(fieldId, message) {
  const errorEl = document.getElementById(fieldId + '-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }
}

function isValidEmail(email) {
  // Simple email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
