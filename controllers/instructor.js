const jwt = require("jsonwebtoken");
const instructorSchema = require('../models/InstructorSchema');
// const middleware = require('../middleware/authorization') 

exports.addInstructor = async ( req , res ) => {
    if ( !req.body.fullName  || !req.body.phone || !req.body.email ){
        res.status(400).json({msg:"Instructor does not exit"});
    }  
    let instruct = new instructorSchema ({
        fullName : req.body.fullName,
        // img: req.body.img,
        phone : req.body.phone,
        email : req.body.email,
    });
    instruct.save()
    .then(b=>{
        if (b) {
            res.status(200).json({b});
        }
    })
    .catch(err=>{
    res.status(400).json({err});
    })
}

exports.getAll =  ( req , res ) => {
    instructorSchema.find({})
    .then(b => {
        return res.status(200).json({ b: b })
    })
    .catch(err => {
        return res.status(400).json({ msg: err.message })
    })
}
exports.getInstructorById =  ( req , res ) => {
    if (!req.query.id) {
        return res.status(400).json({ msg: "You need to send the ID!" })
    }
    instructorSchema.find({ _id: req.query.id })
    .then(b => {
        return res.status(200).json({ b: b });
    })
    .catch(err => {
        return res.status(200).json({ msg: err.message });
    })
}
exports.deleteInstructor =  ( req , res ) => {
    instructorSchema.findByIdAndDelete({_id: req.query.id })
    .then(b => {
        return res.status(200).json({ b: b });
    })
    .catch(err => {
        return res.status(200).json({ msg: err.message });
    })
}