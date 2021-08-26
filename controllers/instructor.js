const Instructor = require('../models/InstructorSchema');

exports.addInstructor = async ( req , res ) => {
    if ( !req.body.fullName  || !req.body.phone || !req.body.email || !req.body.instructor ){
    res.status(400).json({msg:"Instructor does not exit"});
    }  
    let instructor = new Instructor ({
    fullName : req.body.fullName,
    // img: req.body.img,
    phone : req.body.phone,
    email : req.body.email,
    instructor: req.body.instructor,
    });
    instructor.save()
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
    Instructor.find({})
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
    Instructor.find({ _id: req.query.id })
    .then(b => {
    return res.status(200).json({ b: b });
    })
    .catch(err => {
    return res.status(200).json({ msg: err.message });
    })
}

exports.deleteInstructor =  ( req , res ) => {
    Instructor.findByIdAndDelete({_id: req.query.id })
    .then(b => {
    return res.status(200).json({ b: b });
    })
    .catch(err => {
    return res.status(200).json({ msg: err.message });
    })
}