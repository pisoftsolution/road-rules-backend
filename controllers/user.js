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
                    "fullName":req.body.fullName,
                    "role":req.body.role,
                    "phone":req.body.phone,
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


exports.loginUser = (req,res)=>{
    User.findOne({email:req.body.email})
    .then(user =>{
        if(!user){
          return res.status(401).json({msg:"User does not exist"})
          }else {
              bcrypt.compare(req.body.password, user.password ,(error,match)=>{
                  if (error){
                      res.status(500).json(error);
                  }else if (match) {
                    const token = jwt.sign({id: user.id, email: user.email}, "my-first-authorization", {
                        expiresIn: 60 * 60 * 12 * 24 
                    })
                     return res.status(200).json({token: token})
                  } else {
                      return res.status(403).json({error: "passwords do not match"})
                  }
              })
          }
    })
  }
  


exports.changePassword = (req,res) =>{
    const token = req.headers.authorization;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_','/');
    let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
    console.log(decodedData);
    if(decodedData.email === req.body.email){
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                console.error(err);
                return res.status(400).json({msg: "something went wrong"})
        };
            bcrypt.hash(req.body.password, salt, function(err,hash) {
                if (err) {
                    // console.error(err);
                    return res.status(400).json({msg: err.message})
            }
                else {
                    User.findById(decodedData.id)
                    .then(user=>{
                        user.password = hash;
                        user.save()
                        .then(u=>{
                            return res.status(200).json({msg: "password changed successfully"});
                        })
                        .catch(err=>{
                            return res.status(400).json({msg:err.message});
                        })
                    })
                    .catch(err=>{
                        return res.status(400).json({msg: err.message});
                    })
                }
            })
        })
    }else{
        return res.status(500).json({msg: "you are not authorized"})
    }
}


exports.test = (req,res) =>{
    return res.status(200).json({msg:"you are authorized"})
}