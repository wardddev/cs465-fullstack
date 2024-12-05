// script to send email submission to Express backend
async function sendEmail(event) {
    event.preventDefault();

    // Get form data
    const reservationData = {
        email: document.getElementById("emailInput").value,
        trip: document.getElementById("tripInput").value,
        guests: document.getElementById("guestsInput").value,
    };

    try {
        const response = await fetch('/api/mailing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            alert("Reservation submitted successfully! Check your email for confirmation.");
        } else {
            alert("An error occurred while submitting the reservation.");
        }
    } catch (error) {
        console.error("Error submitting reservation", error);
        alert("An error occurred while submitting the reservation.");
    }
}

// Attach event listener to form submission
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("emailForm").addEventListener("submit", sendEmail);
});