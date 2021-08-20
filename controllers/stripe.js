const express = require("express");
const Stripe = require('stripe');
const StripeSchema = require('../models/StripeSchema');

const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const app = express();
app.set("view engine", "pug");

exports.shoppingOnline = async ( req , res ) => {
    if ( !req.body.amount ){
        res.status(400).json({msg:"Amount Not Proceed"});
    }  
    let pay = new StripeSchema ({
        amount : req.body.amount,
    });
    pay.save()
    .then(b=>{
        if (b) {
            res.status(200).json({b});
        }
    })
    .catch(err=>{
    res.status(400).json({err});
    })
}

// exports.paymentIntent = async ( req , res ) => {
//     const session = await StripeSchema.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: 'T-shirt',
//               },
//               unit_amount: 2000,
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: 'http://localhost:3000/success',
//         cancel_url: 'http://localhost:3000/cancel',
//       });
    
//       res.json({ id: session.id });
// }

// exports.successPayment =  ( req , res ) => {
//     res.send('Success Route');
// }

// exports.cancelPayment =  ( req , res ) => {
//     res.send('Cancel Route');
// }