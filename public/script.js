document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.getElementById("year").textContent = new Date().getFullYear();

function viewCV() {
    window.open('document/TAMILARASAN G CV.pdf', '_blank');
}

document.addEventListener('DOMContentLoaded', function () { 
    document.getElementById('contactform').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        const responseMessage = document.getElementById('responseMessage');
        const submitButton = document.getElementById('submitButton');

        if (!submitButton) {
            console.error("submitButton or loadingIndicator is missing in the HTML.");
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch('http://localhost:5000/sendmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });

            const data = await response.json();

            responseMessage.textContent = data.message;
            responseMessage.style.color = data.success ? 'green' : 'red';

        } catch (error) {
            console.error("Error sending email:", error);
            responseMessage.textContent = "Failed to send message.";
            responseMessage.style.color = "red";
        }
        submitButton.disabled = false;
        submitButton.textContent = "🚀 Send Message";
    });
});
