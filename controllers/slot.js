const Slot = require('../models/Slot');

//checking
exports.addSlot = async (req,res) => {
    if(!req.body.date || !req.body.time || !req.body.clientLimit || !req.body.instructor || !req.body.instructorName
        || !req.body.status|| !req.body.booking) {
    return res.status(400).json({msg: "Invalid Data"})
    }
    const user = await Slot.findById(req.query.body)
    if(user){
        let user = new Slot ({
            ...req.body,
        });
        user.save() 
        .then(b=>{
            if (b) {
                res.status(200).json({b});
            }
        })
        .catch(err=>{
            res.status(400).json({err});
        })
    } else {
        res.status(400).json({msg: "Instructor does not exist"});
    }  
}    

exports.modifySlot =  ( req , res ) => {
    Slot.findById(req.query.id)
    .then(b=>{
        if (b) {
            b.date = req.body.date,
            b.time = req.body.time,
            b.clientLimit = req.body.b.clientLimit , 
            b.instructor = req.body.instructor , 
            b.instructorName = req.body.instructorName,
            b.status = req.body.status, 
            b.booking = req.body.booking
            b.save()
            .then(b2=>{
                res.status(200).json(b2);
            })
        }
    })
    .catch(err=>{
        res.status(400).json({err});
    })
}

exports.getSlots =  ( req , res ) => {
    Slot.find({})
    .then(b => {
        return res.status(200).json({ b: b })
    })
    .catch(err => {
        return res.status(400).json({ msg: err.message })
    })
}

exports.getSlotById =  ( req , res ) => {
    // res.json(req.body); 
    if (!req.query.id) {
        return res.status(400).json({ msg: "You need to send the ID!" })
    }
    Slot.find({ _id: req.query.id })
    .then(b => {
        return res.status(200).json({ b: b });
    })
    .catch(err => {
        return res.status(200).json({ msg: err.message });
    })
}
exports.searchSlotByDate =  ( req , res ) => {
    if (!req.query.date) {
        return res.status(400).json({ msg: "Please enter date!" })
    }
    Slot.find({ date: req.query.date })
    .then(b => {
        return res.status(200).json({ b: b });
    })
    .catch(err => {
        return res.status(200).json({ msg: err.message });
    })
}

exports.deleteSlot =  ( req , res ) => {
    Slot.findByIdAndDelete({_id: req.query.id })
    .then(b => {
        return res.status(200).json({ b: b });
    })
    .catch(err => {
        return res.status(200).json({ msg: err.message });
    })
}
