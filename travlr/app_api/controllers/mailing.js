const nodemailer = require('nodemailer');
const validator = require('validator');

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
    const userEmail = req.body.email;

    // validates email format
    if (!validator.isEmail(userEmail)) {
        return res.status(400).send({ error: 'Invalid email format' });
    }

    try {
        let info = await transporter.sendMail({
            from: '"Travlr Getaways" <wardd.dev@outlook.com>',
            to: userEmail,
            subject: 'Welcome to Travlr Getaways',
            text: 'Your email is valid.',
            html: '<b>Your email is valid. Thank you.</b>'
        });
        console.log('Email Sent: ', info.messageId);
        res.status(200).send({ message: 'Email sent successfully', info: info.messageId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to send email' });
    }
}

module.exports = {
    sendEmail
};