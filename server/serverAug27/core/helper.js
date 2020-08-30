'use strict';
const Constants = require('./constant');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(Constants.sendGridKey);

const Helper = {

    sendEmail(to, subject, message) {

        const msg = {
            to: to,
            from: 'abhipanchal098@gmail.com',
            subject: subject,
            html: '<b>' + message + '</b>'
        }

        sgMail.send(msg).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
        })

    },

    encoder(string) {
        const newString = string.toString();
        return Buffer.from(newString).toString('base64');
    },

    decoder(b64Encoded) {
        return Buffer.from(b64Encoded, 'base64').toString();
    },

}

module.exports = Helper