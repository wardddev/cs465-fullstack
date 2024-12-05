const nodemailer = require('nodemailer');
const validator = require('validator');
const Reservation = require('../models/reservation');

require('dotenv').config();

// Use test SMTP account mailtrap for capturing test emails
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,        // SMTP host
    port: process.env.SMTP_PORT,        // SMTP port mailtrap
    auth: {
        user: process.env.SMTP_USER,    // SMTP username
        pass: process.env.SMTP_PASS     // SMTP password
    }
});

async function sendEmail(req, res) {
    const { email, trip, guests } = req.body;

    // validates fields
    if (!validator.isEmail(email)) {
        return res.status(400).send({ error: 'Invalid email format' });
    }

    try {
        // save to database
        const reservation = new Reservation({ email, trip, guests });
        await reservation.save();

        // send email
        const emailFields = {
            from: '"Travlr Getaways" <wardd.dev@outlook.com>',
            to: email,
            subject: 'Reservation Confirmation from Travlr Getaways',
            html: `
                <h1>Reservation Confirmation</h1>
                <p>Thank you for your reservation.</p>
                <p>Here are the details of your reservation:</p>
                <ul>
                    <li><strong>Trip:</strong> ${trip}</li>
                    <li><strong>Guests:</strong> ${guests}</li>
                </ul>
                <p>Thank you for choosing Travlr Getaways!</p>
            `,
        };

        let info = await transporter.sendMail(emailFields);
        console.log('Email Sent: ', info.messageId);

        return res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Error sending email' });
    }
}

module.exports = {
    sendEmail
};