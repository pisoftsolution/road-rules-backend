require('dotenv').config();
const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ContactSchema = require('../models/ContactSchema');

// exports.contactUs = async (req, res) => {
//   if (!req.body.email || !req.body.name || !req.body.message) {
//     res.status(400).json({ msg: 'This is invalid data' });
//   }
//   let about = new ContactSchema({
//     email: req.body.email,
//     name: req.body.name,
//     message: req.body.message
//   });
//   about
//     .save()
//     .then((t) => {
//       if (t) {
//         res.status(200).json({ t });
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({ err });
//     });
// };

// exports.contactUs = async (req, res) => {
//   if (!req.body.email || !req.body.name || !req.body.message) {
//     res.status(400).json({ msg: 'This is invalid data' });
//   }
//   let about = new ContactSchema({
//     email: req.body.email,
//     name: req.body.name,
//     message: req.body.message
//   });
//   about
//     .save()
//     .then((t) => {
//       if (t) {
//         res.status(200).json({ t });
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({ err });
//     });
// };

exports.contactUs = async (req, res) => {
  if (!req.query.email) {
    return res.status(400).send({ msg: 'You Need To Send Email' });
  }
  let user = await ContactSchema.findOne({ email: req.query.email });
  if (!user) {
    return res.status(400).send({ msg: 'User Does Not Exists' });
  }
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  if (!req.body.email || !req.body.name || !req.body.message) {
    return res.status(400).send({ msg: 'You Need To Send Email' });
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const msg = {
    to: process.env.SENDGRID_EMAIL,
    from: process.env.SENDGRID_EMAIL,
    subject: `<h1>name${name} ${email}</h1>`,
    text: `<h1>message </h1>`,
    html: `<p>${message}</p>
    <pre>This is a Random OTP ${otp} </pre>`
  };
  sgMail
    .send(msg)
    .then((info) => {
      console.log(info);
      res.status(200).send({ msg: 'feedback Sent Successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(400)
        .send({ msg: 'feedback Not Send Please Try Again' });
    });
};
