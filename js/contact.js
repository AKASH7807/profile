const contactForm = document.getElementById('contact-form');
const contactmessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('service_ti3z33b', 'template_8ricj7d', '#contact-form', '0vQKtOhSgnu9weJxu')
        .then(() => {
            contactmessage.textContent = 'message sent successfully'

            setTimeout(() => {
                contactmessage.textContent = ''
            }, 5000)

            contactForm.reset()
        }, () => {
            contactmessage.textContent = 'message not sent (service error)'
        })
}

contactForm.addEventListener('submit', sendEmail)