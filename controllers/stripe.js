const express = require('express');
const StripeSchema = require('../models/StripeSchema');
const SuccessSchema = require('../models/SuccessSchema');
const middleware = require('../middleware/authorization');

exports.addAmount =  ( req , res ) => {
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

exports.getAmountById = (req,res) => {
    if (!req.query.id) {
        return res.status(400).json({msg: "You Need To Send The ID!"});
    }
    StripeSchema.find({_id: req.query.id})
    .then(user=> {
        return res.status(200).json({user : user});
    })
    .catch(err=> {
        return res.status(200).json({msg : err.message});
    })
}

exports.payment = async ( req , res ) => {
    const session = await StripeSchema.checkout.sessions.create({ 
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: req.body.unit_amount,
            },
            quantity: req.body.quantity,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
    
      res.json({ id: session.id });
}

exports.paymentReceipt = async ( req , res ) => {
    const {email,price} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
      });
      res.json({'client_secret': paymentIntent['client_secret']})
}

// exports.success = async ( req , res ) => {
//     res.send("routes")
// }

// exports.cancel = async ( req , res ) => {
//     res.send("routes")
// }