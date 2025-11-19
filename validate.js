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
