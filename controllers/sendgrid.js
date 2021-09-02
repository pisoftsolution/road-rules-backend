require('dotenv').config();
const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
const sgMail = require('@sendgrid/mail');
const ClientSchema = require('../models/UserSchema')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailOTPSend = async (req, res) => {
    if (!req.query.email) {
        return res.status(400).send({ msg: 'You Need To Send Email' });
    }
    let user = await ClientSchema.findOne({ email: req.query.email });
    if (!user) {
        return res.status(400).send({ msg: 'User Does Not Exists' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const msg = {
        to: req.query.email,
        from: process.env.SENDGRID_EMAIL,
        subject: "six digit Random OTP",
        text: "Random OTP",
        html: `<h1>Random OTP</h1>
        <pre>This is a Random OTP ${otp} </pre>`
    }
    sgMail.send(msg)
        .then(info => {
            console.log(info);
            user.emailOTP = otp;
            user.save()
                .then(u => {
                    return res.status(200).send({ msg: "Otp Sent Successfully" });
                })
        })
        .catch(err => {
            console.error(err);
            return res.status(400).send({ msg: "Otp Not Send Please Try Again" });
        })
}

exports.emailOTPVerify = async (req, res) => {
    if (!req.query.email ||
        !req.query.otp) {
        return res.status(400).send({ msg: 'You Need To Send Email and OTP' });
    }
    let user = await ClientSchema.findOne({ email: req.query.email });
    if (!user) {
        return res.status(400).send({ msg: 'User Does Not Exists' });
    }
    if (user.emailOTP == req.query.otp) {
        user.isEmailVerified = true;
        user.save()
            .then(u => {
                return res.status(200).send({ msg: "Email Verified Successfully" });
            })
            .catch(err => {
                console.error(err);
                return res.status(400).send({ msg: err.message });
            })
    }
}
