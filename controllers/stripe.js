require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const SuccessSchema = require('../models/SuccessSchema');

exports.checkout = async (req ,res) => {
   const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.body.price ,
      },
    ],
       mode: 'payment',
       success_url: 'http://localhost:3000/success',
       cancel_url: 'http://localhost:3000/cancel',
    });
       res.json({ id: session.id });
}

exports.confirmPayment = async (req ,res ) => {
    let payment = SuccessSchema({
        session_id: session_id,
          user_id: user_id,
    })
      payment.save((err, pay)=>{
          if (err) {
              console.log(err);
              return res.status(400).json({msg:err.message});
          }
          return res.status(201).json({ id: pay.session_id })
      })
};