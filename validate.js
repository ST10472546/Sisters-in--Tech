/*Enquiry form validation*/

// Helper function to validate email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Helper function to validate phone number (South African format)
        function isValidPhone(phone) {
            // Allow common formats: 10-12 digits, can include spaces, dashes, parentheses
            const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{8,14}$/;
            const digitsOnly = phone.replace(/\D/g, '');
            return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 12;
        }

        // Helper function to validate name (letters, spaces, hyphens, apostrophes only)
        function isValidName(name) {
            const nameRegex = /^[a-zA-Z\s\-\']+$/;
            return nameRegex.test(name) && name.length >= 2;
        }

        // Clear error message
        function clearError(fieldId) {
            const errorElement = document.getElementById(fieldId + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            const field = document.getElementById(fieldId);
            if (field) {
                field.classList.remove('error');
            }
        }

        // Show error message
        function showError(fieldId, message) {
            const errorElement = document.getElementById(fieldId + 'Error');
            const field = document.getElementById(fieldId);
            
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
            
            if (field) {
                field.classList.add('error');
            }
        }

        // Validate individual fields on blur
        document.getElementById('name').addEventListener('blur', function() {
            const name = this.value.trim();
            if (!name) {
                showError('name', 'Full name is required');
            } else if (!isValidName(name)) {
                showError('name', 'Please enter a valid name (letters and spaces only)');
            } else {
                clearError('name');
            }
        });

        document.getElementById('enquiryEmail').addEventListener('blur', function() {
            const email = this.value.trim();
            if (!email) {
                showError('enquiryEmail', 'Email address is required');
            } else if (!isValidEmail(email)) {
                showError('enquiryEmail', 'Please enter a valid email address');
            } else {
                clearError('enquiryEmail');
            }
        });

        document.getElementById('enquiryPhone').addEventListener('blur', function() {
            const phone = this.value.trim();
            if (!phone) {
                showError('enquiryPhone', 'Phone number is required');
            } else if (!isValidPhone(phone)) {
                showError('enquiryPhone', 'Please enter a valid phone number (10-12 digits)');
            } else {
                clearError('enquiryPhone');
            }
        });

        document.getElementById('service').addEventListener('change', function() {
            if (!this.value) {
                showError('service', 'Please select a service');
            } else {
                clearError('service');
            }
        });

        document.getElementById('enquiryBudget').addEventListener('change', function() {
            if (!this.value) {
                showError('enquiryBudget', 'Please select a budget range');
            } else {
                clearError('enquiryBudget');
            }
        });

        // Form submission handling with comprehensive validation
        const enquiryForm = document.getElementById('enquiryForm');
        const enquirySuccess = document.getElementById('enquirySuccess');
        const enquiryError = document.getElementById('enquiryError');

        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get field values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('enquiryEmail').value.trim();
            const phone = document.getElementById('enquiryPhone').value.trim();
            const service = document.getElementById('service').value;
            const budget = document.getElementById('enquiryBudget').value;
            
            let isValid = true;
            
            // Validate each field and show appropriate errors
            if (!name) {
                showError('name', 'Full name is required');
                isValid = false;
            } else if (!isValidName(name)) {
                showError('name', 'Please enter a valid name (letters and spaces only)');
                isValid = false;
            } else {
                clearError('name');
            }
            
            if (!email) {
                showError('enquiryEmail', 'Email address is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('enquiryEmail', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('enquiryEmail');
            }
            
            if (!phone) {
                showError('enquiryPhone', 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('enquiryPhone', 'Please enter a valid phone number (10-12 digits)');
                isValid = false;
            } else {
                clearError('enquiryPhone');
            }
            
            if (!service) {
                showError('service', 'Please select a service');
                isValid = false;
            } else {
                clearError('service');
            }
            
            if (!budget) {
                showError('enquiryBudget', 'Please select a budget range');
                isValid = false;
            } else {
                clearError('enquiryBudget');
            }
            
            // If form is not valid, show general error and scroll to top
            if (!isValid) {
                enquiryError.textContent = 'Please correct the errors above before submitting.';
                enquiryError.style.display = 'block';
                enquiryError.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }


/*Registration and Message Form validation*/
 // ============================================
    // VALIDATION UTILITIES
    // ============================================

    // Email validation with enhanced regex
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Name validation (letters, spaces, hyphens only)
    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
        return nameRegex.test(name.trim());
    }

    // File validation
    function validateFile(fileInput) {
        if (!fileInput.files || fileInput.files.length === 0) {
            return { valid: true, message: '' }; // Optional field
        }

        const file = fileInput.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (file.size > maxSize) {
            return { valid: false, message: 'File size must be less than 5MB' };
        }

        if (!allowedTypes.includes(file.type)) {
            return { valid: false, message: 'File type not allowed. Please upload images, PDF, or Word documents only.' };
        }

        return { valid: true, message: '' };
    }

    // Display error message
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        let errorDiv = input.parentElement.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#d32f2f';
            errorDiv.style.fontSize = '14px';
            errorDiv.style.marginTop = '5px';
            input.parentElement.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.style.borderColor = '#d32f2f';
    }

    // Clear error message
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorDiv = input.parentElement.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        input.style.borderColor = '';
    }

    // Show success message with auto-hide
    function showSuccess(elementId, message, duration = 5000) {
        const successElement = document.getElementById(elementId);
        successElement.textContent = message;
        successElement.style.display = 'block';
        
        setTimeout(() => {
            successElement.style.display = 'none';
        }, duration);
    }

    // ============================================
    // EMAIL PROCESSING SIMULATION
    // ============================================

    // Simulate sending email to appropriate department
    function processEmail(formType, formData) {
        // Determine recipient based on form type
        let recipient = '';
        let subject = '';

        if (formType === 'registration') {
            recipient = 'hello@tech-sisters.com';
            subject = `New Registration: ${formData.name}`;
        } else if (formType === 'contact') {
            // Route based on subject keywords
            const subjectLower = formData.subject.toLowerCase();
            
            if (subjectLower.includes('partner') || subjectLower.includes('collaboration')) {
                recipient = 'partners@tech-sisters.com';
            } else if (subjectLower.includes('support') || subjectLower.includes('help')) {
                recipient = 'support@tech-sisters.com';
            } else {
                recipient = 'hello@tech-sisters.com';
            }
            
            subject = `Contact Form: ${formData.subject}`;
        }

        // Simulate email sending (in production, this would be an API call)
        console.log('=== EMAIL PROCESSING ===');
        console.log('To:', recipient);
        console.log('Subject:', subject);
        console.log('Form Data:', formData);
        console.log('Timestamp:', new Date().toISOString());
        console.log('========================');

        // In production, replace with actual email API call:
        /*
        return fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: recipient,
                subject: subject,
                formData: formData,
                formType: formType
            })
        });
        */

        // Simulate successful send
        return Promise.resolve({ success: true, recipient: recipient });
    }

    // ============================================
    // REGISTRATION FORM SUBMISSION
    // ============================================

    window.submitRegistration = function() {
        // Clear all previous errors
        ['regName', 'regEmail', 'city', 'attachment'].forEach(clearError);

        let isValid = true;
        const formData = {};

        // Validate Name
        const name = document.getElementById('regName').value.trim();
        if (!name) {
            showError('regName', 'Name is required');
            isValid = false;
        } else if (!validateName(name)) {
            showError('regName', 'Please enter a valid name (letters, spaces, and hyphens only)');
            isValid = false;
        } else {
            formData.name = name;
        }

        // Validate Email
        const email = document.getElementById('regEmail').value.trim();
        if (!email) {
            showError('regEmail', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('regEmail', 'Please enter a valid email address');
            isValid = false;
        } else {
            formData.email = email;
        }

        // Validate City
        const city = document.getElementById('city').value;
        if (!city) {
            showError('city', 'Please select a city');
            isValid = false;
        } else {
            formData.city = city;
        }

        // Get Gender
        const gender = document.querySelector('input[name="gender"]:checked').value;
        formData.gender = gender;

        // Validate File (if uploaded)
        const fileInput = document.getElementById('attachment');
        const fileValidation = validateFile(fileInput);
        if (!fileValidation.valid) {
            showError('attachment', fileValidation.message);
            isValid = false;
        } else if (fileInput.files && fileInput.files.length > 0) {
            formData.fileName = fileInput.files[0].name;
            formData.fileSize = fileInput.files[0].size;
        }

        // Get Comments
        formData.comments = document.getElementById('comments').value.trim();

        // If validation passes, process the form
        if (isValid) {
            // Disable submit button to prevent double submission
            const submitBtn = event.target;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting... ⏳';

            // Process email
            processEmail('registration', formData)
                .then(response => {
                    showSuccess('registrationSuccess', 
                        `Registration submitted successfully! 💖 Confirmation sent to ${response.recipient}. We'll contact you within 24-48 hours.`);
                    
                    // Clear form
                    document.getElementById('regName').value = '';
                    document.getElementById('regEmail').value = '';
                    document.getElementById('city').value = '';
                    document.getElementById('comments').value = '';
                    document.getElementById('attachment').value = '';
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Registration 💌';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error submitting your registration. Please try again or contact us directly at hello@tech-sisters.com');
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Registration 💌';
                });
        }
    };

    // ============================================
    // CONTACT FORM SUBMISSION
    // ============================================

    window.submitContact = function() {
        // Clear all previous errors
        ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'].forEach(clearError);

        let isValid = true;
        const formData = {};

        // Validate Name
        const name = document.getElementById('contactName').value.trim();
        if (!name) {
            showError('contactName', 'Name is required');
            isValid = false;
        } else if (!validateName(name)) {
            showError('contactName', 'Please enter a valid name (letters, spaces, and hyphens only)');
            isValid = false;
        } else {
            formData.name = name;
        }

        // Validate Email
        const email = document.getElementById('contactEmail').value.trim();
        if (!email) {
            showError('contactEmail', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('contactEmail', 'Please enter a valid email address');
            isValid = false;
        } else {
            formData.email = email;
        }

        // Validate Subject
        const subject = document.getElementById('contactSubject').value.trim();
        if (!subject) {
            showError('contactSubject', 'Subject is required');
            isValid = false;
        } else if (subject.length < 5) {
            showError('contactSubject', 'Subject must be at least 5 characters long');
            isValid = false;
        } else {
            formData.subject = subject;
        }

        // Validate Message
        const message = document.getElementById('contactMessage').value.trim();
        if (!message) {
            showError('contactMessage', 'Message is required');
            isValid = false;
        } else if (message.length < 20) {
            showError('contactMessage', 'Message must be at least 20 characters long');
            isValid = false;
        } else {
            formData.message = message;
        }

        // If validation passes, process the form
        if (isValid) {
            // Disable submit button to prevent double submission
            const submitBtn = event.target;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending... ⏳';

            // Process email
            processEmail('contact', formData)
                .then(response => {
                    showSuccess('contactSuccess', 
                        `Message sent successfully! 💖 Your inquiry has been forwarded to ${response.recipient}. We'll respond within 24 hours.`);
                    
                    // Clear form
                    document.getElementById('contactName').value = '';
                    document.getElementById('contactEmail').value = '';
                    document.getElementById('contactSubject').value = '';
                    document.getElementById('contactMessage').value = '';
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message 💌';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error sending your message. Please try again or contact us directly at hello@tech-sisters.com');
                    
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message 💌';
                });
        }
    };

    // ============================================
    // REAL-TIME VALIDATION (Optional Enhancement)
    // ============================================

    // Add real-time validation on blur
    const validateOnBlur = (inputId, validator, errorMessage) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('blur', () => {
                const value = input.value.trim();
                if (value && !validator(value)) {
                    showError(inputId, errorMessage);
                } else if (value) {
                    clearError(inputId);
                }
            });

                                     
