const Slot = require('../models/SlotSchema');
const Instructor = require('../models/InstructorSchema');

exports.addSlot = async (req, res) => {
  if (
    !req.body.date ||
    !req.body.time ||
    !req.body.clientLimit ||
    !req.body.instructor
  ) {
    return res.status(400).json({ msg: 'Invalid Data' });
  } 
  const instructors = await Instructor.findById(req.body.instructor);
  if (instructors) {
    let slot = new Slot({
      ...req.body,
      instructorName: instructors.fullName,
      status:"scheduled", 
    });
    slot
      .save()
      .then((b) => {
        if (b) {
          res.status(200).json({ b });
        }
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  } else {
    res.status(400).json({ msg: 'Instructor Does Not Exist' });
  }
};

exports.modifySlot = async (req, res) => {
  const instructors = await Instructor.findById(req.body.instructor)
  if(instructors){
    let slot = new Slot({
      ...req.body,
      instructorName: instructors.fullName,
      status:"scheduled", 
    });
  Slot.findById(req.query.id)
    .then(b => {
      if (b) {
        b.date = req.body.date,
        b.time = req.body.time,
        b.clientLimit = req.body.clientLimit,
        b.instructor = req.body.instructor, 
        slot.save()
        .then(b2 => {
          res.status(200).json(b2);
        });
      }
    })
    .catch(err => {
      res.status(400).json({ err });
    });
  } else{
    res.status(400).json({ msg: 'Instructor Does Not Exist' });
  }
};

// exports.modifySlot = async (req, res) => {
//   const instructors = await Instructor.findById(req.body.instructor);
//   if (instructors) {
//     let slot = new Slot({
//       ...req.body,
      
//     });
//     Slot.findById(req.query.id)
//       .then((b) => {
//         if (b) {
//           (b.date = req.body.date),
//             (b.time = req.body.time),
//             (b.clientLimit = req.body.b.clientLimit),
//             (b.instructor = req.body.instructor),
//             (b.instructorName = instructors.instructorName),
//           slot.save().then((b2) => {
//             res.status(200).json(b2);
//           });
//         }
//       })
//       .catch((err) => {
//         res.status(400).json({ err });
//       });
//   } else {
//     res.status(400).json({ msg: 'Instructor Does Not Exist' });
//   }
// };

exports.getSlots = (req, res) => {
  Slot.find({})
    .then((b) => {
      return res.status(200).json({ b: b });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err.message });
    });
};

exports.getSlotById = (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ msg: 'You Need To Send ID!' });
  }
  Slot.findOne({ _id: req.query.id })
    .then((b) => {
      return res.status(200).json({ b: b });
    })
    .catch((err) => {
      return res.status(200).json({ msg: err.message });
    });
};
exports.searchSlotByDate = (req, res) => {
  if (!req.query.date) {
    return res.status(400).json({ msg: 'Please Enter Date!' });
  }
  Slot.find({ date: req.query.date })
    .then((b) => {
      return res.status(200).json({ b: b });
    })
    .catch((err) => {
      return res.status(200).json({ msg: err.message });
    });
};

exports.deleteSlot = (req, res) => {
  Slot.findByIdAndDelete({ _id: req.query.id })
    .then((b) => { 
      return res.status(200).json({ b: b });
    })
    .catch((err) => {
      return res.status(200).json({ msg: err.message }); 
    });
};
