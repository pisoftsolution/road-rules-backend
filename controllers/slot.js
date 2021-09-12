const Slot = require('../models/SlotSchema');

exports.addSlot = (req, res) => {
  if (!req.body.date ||
    !req.body.time ||
    !req.body.clientLimit ||
    !req.body.instructor ||
    !req.body.instructorName ||
    !req.body.status ||
    !req.body.booking) {
    res.status(400).json({ msg: "This is invalid data" });
  }
  let about = new Slot({
    date: req.body.date,
    time: req.body.time,
    clientLimit: req.body.clientLimit,
    instructor: req.body.instructor,
    instructorName: req.body.instructorName,
    status: req.body.status,
    booking: req.body.booking, 
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

exports.getSlots = (req, res) => {
  console.log(req.query);
  Slot.find({})
    .then(b => {
      res.status(200).json({ b: b });
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
};

exports.modifySlot = (req, res) => {
  Slot.findById(req.query.id)
    .then(b => {
      if (b) {
        b.date = req.body.date;
        b.time = req.body.time;
        b.clientLimit = req.body.clientLimit;
        b.instructor = req.body.instructor;
        b.instructorName = req.body.instructorName;
        b.status = req.body.status;
        b.booking = req.body.booking;
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
