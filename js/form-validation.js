/**
 * Kanachur Islamic Education Trust (R) - Production Form Validation
 * Real-time frontend validation & accessible feedback with backend placeholders.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFormValidation('contactForm', submitContactForm);
  initFormValidation('inquiryForm', submitInquiryForm);
});

/**
 * Universal Form Validation Wrapper
 * @param {string} formId - ID of the HTML form
 * @param {function} submitHandler - Callback on successful validation
 */
function initFormValidation(formId, submitHandler) {
  const form = document.getElementById(formId);
  if (!form) return;

  const inputs = form.querySelectorAll('input, select, textarea');

  // Add blur listener for instant validation feedback
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group')?.classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      submitHandler(form);
    } else {
      const firstError = form.querySelector('.form-group.has-error input, .form-group.has-error textarea, .form-group.has-error select');
      if (firstError) firstError.focus();
    }
  });
}

/**
 * Validates a single input field
 */
function validateField(input) {
  const group = input.closest('.form-group');
  if (!group) return true;

  const errorEl = group.querySelector('.form-error');
  let errorMessage = '';

  const value = input.value.trim();
  const isRequired = input.hasAttribute('required');

  if (isRequired && !value) {
    errorMessage = 'This field is required.';
  } else if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address.';
    }
  } else if (input.type === 'tel' && value) {
    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneRegex.test(value)) {
      errorMessage = 'Please enter a valid telephone number.';
    }
  }

  if (errorMessage) {
    group.classList.add('has-error');
    if (errorEl) errorEl.textContent = errorMessage;
    input.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    group.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
    input.removeAttribute('aria-invalid');
    return true;
  }
}

/**
 * Async API Placeholder Handler for Contact Form
 */
function submitContactForm(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending Message...';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log('Sending Contact Form Payload:', data);

  // TODO: Connect to backend API endpoint
  // POST /api/contact
  // Example:
  // fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // })

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    
    // Display Success Feedback
    showFormSuccessModal('Thank you! Your message has been sent successfully. Our trust representative will get back to you shortly.');
    form.reset();
  }, 1200);
}

/**
 * Async API Placeholder Handler for Admissions Inquiry Form
 */
function submitInquiryForm(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Submitting Inquiry...';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log('Sending Admissions Inquiry Payload:', data);

  // TODO: Connect to backend API endpoint
  // POST /api/admissions
  
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    showFormSuccessModal('Inquiry Received! The Academic Admissions Cell at Kanachur Trust will contact you regarding course availability.');
    form.reset();
  }, 1200);
}

/**
 * Displays an accessible modal notification on form submission success
 */
function showFormSuccessModal(message) {
  const overlay = document.createElement('div');
  overlay.className = 'flex-center';
  overlay.style.cssText = `
    position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); z-index: 9999;
    backdrop-filter: blur(4px); padding: 1.5rem;
  `;

  const card = document.createElement('div');
  card.style.cssText = `
    background: #ffffff; padding: 2.5rem; border-radius: 16px; max-width: 450px;
    width: 100%; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
    border-top: 5px solid #008744;
  `;

  card.innerHTML = `
    <div style="width:56px; height:56px; background:#e6f5ec; color:#008744; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem; font-size:1.75rem; font-weight:bold;">✓</div>
    <h3 style="font-size:1.4rem; color:#0f172a; margin-bottom:0.75rem;">Submission Received</h3>
    <p style="color:#475569; margin-bottom:1.75rem; font-size:0.95rem;">${message}</p>
    <button id="closeModalBtn" class="btn btn-secondary" style="width:100%;">Close Notification</button>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  const closeBtn = card.querySelector('#closeModalBtn');
  closeBtn.focus();

  const closeModal = () => overlay.remove();
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
}
