const nodemailer = require('nodemailer');

// Use test SMTP account mailtrap for capturing test emails
let transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io', // SMTP host
    port: 2525, // mailtrap
    auth: {
        user: '3b9335354c9853', // SMTP usernamer
        pass: 'd007592d1b1a2b' // SMTP password
    }
});

async function sendEmail(req, res) {
    try {
        let info = await transporter.sendMail({
            from: '"David Ruth" <wardd.dev@outlook.com>',
            to: 'wardd.dev@outlook.com',
            subject: 'Test Email',
            text: 'This is a test email.',
            html: '<b>This is a test email from localhost.</b>'
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