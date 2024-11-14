const nodemailer = require('nodemailer');
const validator = require('validator');

//require('dotenv').config();

// Use test SMTP account mailtrap for capturing test emails
let transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io', // SMTP host
    port: 2525, // mailtrap
    auth: {
        user: '3b9335354c9853', // SMTP username
        pass: 'd007592d1b1a2b' // SMTP password
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