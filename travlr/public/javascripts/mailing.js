// script to send email submission to Express backend
async function sendEmail(event) {
    event.preventDefault();

    // Get form data
    const emailInput = document.getElementById("emailInput");
    const tripInput = document.getElementById("tripInput");
    const guestsInput = document.getElementById("guestsInput");

    if (!emailInput || !tripInput || !guestsInput) {
        console.error("Error: Form elements not found.");
        return;
    }

    const reservationData = {
        email: emailInput.value,
        trip: tripInput.value,
        guests: guestsInput.value,
    };

    // Validate form data
    if (!reservationData.email || !reservationData.trip || !reservationData.guests) {
        console.error("Error: Form data not filled.");
        return;
    }

    if (reservationData.guests <= 0) {
        alert("Guests must be a positive number.");
        return;
    }

    try {
        const response = await fetch('/api/mailing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if (response.ok) {
            alert("Reservation submitted successfully! Check your email for confirmation.");
        } else {
            alert("An error occurred while submitting the reservation.");
            console.error("Error submitting reservation", response.status, response.statusText);
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