'use strict';
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const puppeteer = require('puppeteer');

// const nodemailer = require('nodemailer');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });





//todo: make the automatic send welcome email function work

const APP_NAME = 'MusicSer';


let mailTransport = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: 'aviad2154@gmail.com',
        pass: '1234' // todo: make it generic
    }
});

exports.ping = functions.https.onRequest((request, response) => {
    functions.logger.info('Hello logs! pong', {structuredData: true});
    response.send('pong');
});


exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    // ...
    const email = user.email;
    const displayName = user.displayName;
    console.log(user)

    return sendWelcomeEmail(email, displayName);
});

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <aviad@musicser.com>`,firebase deploy --only hosting
        to: email,
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
    await mailTransport.sendMail(mailOptions);
    console.log('New welcome email sent to:', email);
    return null;
}


