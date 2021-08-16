const jwt = require("jsonwebtoken");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const middleware = require('../middleware/authorization')

exports.registerUser = (req,res) => {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            console.error(err);
            return res.status(400).json({msg: "Something went wrong"})
    };
        bcrypt.hash(req.body.password, salt, function(err,hash) {  
            if (err) {
                console.error(err);
                return res.status(400).json({msg: err.message})
        }
            else {
                const incomingUser = {
                    "email" : req.body.email,
                    "password": hash,
                    // "fullName":req.body.fullName,
                    // "role":req.body.role,
                    // "phone":req.body.phone,
                };
                const newUser = User(incomingUser);
                newUser.save()
                .then(user=>{
                    return res.status(200).json(user)
                })
                .catch(error=>{
                    if (error) {
                        console.error(error);
                        return res.status(400).json({msg: error.message})
                }
                })
            }
        })
    })
}

exports.test = (req,res) =>{
    return res.status(200).json({msg:"you are authorized"})
}