async function sendEmail(event) {
    event.preventDefault();
    const email = document.getElementById("emailInput").value;

    try {
        const response = await fetch('/api/mailing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            alert("Email sent successfully.");
        } else {
            alert("Failed to send email.");
        }
    } catch (error) {
        console.error("Error sending email:", error);
        alert("An error occurred while sending the email.");
    }
}

// Attach event listener to form submission
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("emailForm").addEventListener("submit", sendEmail);
});