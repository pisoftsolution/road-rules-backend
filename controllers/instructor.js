const Instructor = require('../models/InstructorSchema');

exports.addInstructor = (req, res) => {
  if (!req.body.fullName ||
    !req.body.phone ||
    !req.body.email) {
    res.status(400).json({ msg: "This is invalid data" }); 
  }
  let about = new Instructor({
    fullName: req.body.fullName,
    phone: req.body.phone, 
    email: req.body.email
  });
  about.save() 
    .then(b => {
      if (b) {
        res.status(200).json({ b });
      }
    })
    .catch(err => { 
      res.status(400).json({ err });
    })
};

exports.updateInstructor = (req, res) => {
  Instructor.findById(req.query.id)
    .then(b => {
      if (b) {
        b.fullName = req.body.fullName;
        b.phone = req.body.phone;
        b.email = req.body.email;
        b.save()
          .then(b2 => {
            res.status(200).json(b2);
          });
      }
    })
    .catch(err => {
      res.status(400).json({ err });
    });
};

exports.getAll = (req, res) => {
  Instructor.find({})
    .then((b) => {
      return res.status(200).json({ b: b });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err.message });
    });
};

exports.getInstructorById = (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ msg: 'You need to send the ID!' });
  }
  Instructor.find({ _id: req.query.id })
    .then((b) => {
      return res.status(200).json({ b: b });
    })
    .catch((err) => {
      return res.status(200).json({ msg: err.message });
    });
};

exports.deleteInstructor = (req, res) => {
  Instructor.findByIdAndDelete({ _id: req.query.id })
    .then((b) => {
      return res.status(200).json({ b: b });
    })
    .catch((err) => {
      return res.status(200).json({ msg: err.message });
    });
};
