require('dotenv').config();
const { SENDGRID_API_KEY,SENDGRID_EMAIL } = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailOTPSend = (req, res)=>{ 
    if(!req.query.email){
        return res.status(400).send({msg:'You need to send email'});
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
        console.log(info);
        res.status(200).send({msg: "otp sent successfully"})
    })
    .catch(err=>{
        console.error(err);
        res.status(400).send({msg: "otp not send please try again"})
    })
}