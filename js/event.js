    // Add background color to header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Modal Functionality
    const modal = document.getElementById('registrationModal');
    const modalTitle = document.getElementById('modalTitle');

    function openModal(eventName) {
        modalTitle.textContent = `Register for ${eventName}`;
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function submitRegistration() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name && email) {
            alert(`Thank you, ${name}! You have successfully registered for the event. We will send a confirmation to ${email}.`);
            closeModal();
        } else {
            alert('Please fill out all fields.');
        }
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    function submitRegistration() {
    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
    alert("Please verify that you're not a robot.");
    return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
    alert("Please fill in all fields.");
    return;
    }

    // Your backend call or form processing
    alert("Registration submitted!");
    closeModal();
    }