const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('.contact-send');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
    if (submitBtn) {
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
    }

    emailjs.sendForm('service_ti3z33b', 'template_8ricj7d', '#contact-form', '0vQKtOhSgnu9weJxu')
        .then(() => {
            // Success message
            if (contactMessage) {
                contactMessage.textContent = '✅ Message sent successfully!';
                contactMessage.className = 'contact-message show success';

                setTimeout(() => {
                    contactMessage.className = 'contact-message';
                    contactMessage.textContent = '';
                }, 5000);
            }

            contactForm.reset();
        })
        .catch(() => {
            // Error message
            if (contactMessage) {
                contactMessage.textContent = '❌ Message not sent (service error)';
                contactMessage.className = 'contact-message show error';

                setTimeout(() => {
                    contactMessage.className = 'contact-message';
                    contactMessage.textContent = '';
                }, 5000);
            }
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
};

if (contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}
