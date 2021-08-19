require('dotenv').config();
const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
const sgMail = require('@sendgrid/mail');
const User = require('../models/User')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailOTPSend = async (req, res)=>{ 
    if (!req.query.email){
        return res.status(400).send({msg:'You Need To Send Email'});
    }
    let user = await User.findOne({email: req.query.email});
    if (! user) {
        return res.status(400).send({msg:'User Does Not Exists'});
    }
    const otp = Math.floor(100000 + Math.random()*900000); 
    const msg = {
        to: req.query.email,
        from : process.env.SENDGRID_EMAIL,
        subject : "six digit Random OTP",
        text: "Random OTP",
        html: `<h1>Random OTP</h1>
               <pre>This is a Random OTP ${otp} </pre>`
     }
    sgMail.send(msg)
    .then(info=>{
        user.emailOTP = otp;
        user.save()
        .then(u=>{
            res.status(200).send({msg: "Otp Sent Successfully"});
        })
    })
    .catch(err=>{
        console.error(err);
        res.status(400).send({msg: "Otp Not Send Please Try Again"});
    })
}