const AddressSchema = require('../models/AdressSchema');
const User = require('../models/User');

exports.addAddress = async  ( req , res ) => {
    if ( !req.body.city ||!req.body.province || !req.body.street || !req.body.postalCode){
        res.status(400).json({msg:"This Is Invalid Data"});
    }
    let address = new AddressSchema({
        city : req.body.city,
        province : req.body.province,
        street: req.body.street,
        postalCode: req.body.postalCode,
    });
    address.save()
    .then(a=>{
        if (a) {
            res.status(200).json({a});
        }
    })
    .catch(err=>{
        res.status(400).json({err});
    })
}

exports.getUserById =  ( req , res ) => {
    if (!req.query.id) {
        return res.status(400).json({ msg: "Address ID Is Invalid!" })
    }
    AddressSchema.find({ _id: req.query.id })
    .then(a=> {
        return res.status(200).json({ a: a });
    })
    .catch(err => {
        return res.status(200).json({ msg: err.message });
    })
}