const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();


    emailjs.sendForm('service_ti3z33b', 'template_8ricj7d', '#contact-form', '0vQKtOhSgnu9weJxu')
        .then(() => {
            // Success message
            contactMessage.textContent = '✅ Message sent successfully!';
            contactMessage.className = 'contact-message show success';

            setTimeout(() => {
                contactMessage.className = 'contact-message';
                contactMessage.textContent = '';
            }, 5000);

            contactForm.reset();
        },
            () => {
                // Error message
                contactMessage.textContent = '❌ Message not sent (service error)';
                contactMessage.className = 'contact-message show error';

                setTimeout(() => {
                    contactMessage.className = 'contact-message';
                    contactMessage.textContent = '';
                }, 5000);
            }
        );
};

contactForm.addEventListener('submit', sendEmail);
