'use strict';

var resolvedOptions = require('../utilities/base').Options;

const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ilian.iliev.herokuapp@gmail.com',
        pass: 'ilian6806heroku'
    } 
});


module.exports = {

    send: function (req, res) {

        let data = req.body;
        let mailOptions = new resolvedOptions({
            from: data.email,
            to: 'ilian6806@abv.bg',
            subject: data.subject,
            html: `
                <div><b>Name:</b> ${data.name}</div>
                <div><b>Email:</b> ${data.email}</div>
                <div><b>Message:</b></div>
                <br>
                <div>
                    ${data.message}
                </div>
            `
        },{
            from: '',
            subject: '',
            html: ''
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500);
                log(error);
            } else {
                res.status(200);
                log(`Message ${info.messageId} sent: ${info.response}`);
            }
            res.end();
        });
    }
};
