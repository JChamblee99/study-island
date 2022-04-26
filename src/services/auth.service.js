const nodeMailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

let mailTransporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD
    }
})

const userService = require('../services/user.service');

const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'foobar';

const auth = {

    // Sends verification email
    requestEmailVerification: (userId, email) => {

        const token = jwt.sign(userId, TOKEN_SECRET);

        let mailDetails = {
            from: GMAIL_USER,
            to: email,
            subject: 'Account Registration: StudyIsland',
            text: `Click the following link to register your account with StudyIsland: https://studyisland.app/auth/verify-email/${token}`
            /*text: `Click the following link to register your account with StudyIsland: localhost:3000/auth/verify-email/${token}`*/
        };

        mailTransporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.error('Error sending Email')
            } else {
                console.log('Email sent successfully')
            }
        })
    },

    // Verifies email
    verifyEmail: async (token) => {
        jwt.verify(token, TOKEN_SECRET, async (err, userId) => {
            await userService.activateUser(userId);
        })
    }
}

module.exports = auth;