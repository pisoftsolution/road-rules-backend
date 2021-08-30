const RideSchema = require('../models/RideSchema');

exports.addRideCash = async (req, res) => {
  if (
    !req.body.client ||
    !req.body.clientName ||
    !req.body.instructor ||
    !req.body.booking ||
    !req.body.instructorName ||
    !req.body.slot ||
    !req.body.date ||
    !req.body.time ||
    !req.body.status ||
    !req.body.modeOfPayment ||
    !req.body.price ||
    !req.body.feedback ||
    !req.body.address ||
    !req.body.rating
  ) {
    res.status(400).json({ msg: 'This is not a valid data' });
  }
  let ride = new RideSchema({
    client: req.body.client,
    clientName: req.body.clientName,
    instructor: req.body.instructor,
    booking: req.body.booking,
    instructorName: req.body.instructorName,
    slot: req.body.slot,
    date: req.body.date,
    time: req.body.time,
    status: req.body.status,
    modeOfPayment: 'Cash',
    price: req.body.price,
    feedback: req.body.feedback,
    address: req.body.address,
    rating: req.body.rating
  });
  ride
    .save()
    .then((b) => {
      if (b) {
        res.status(200).json({ b });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

exports.addBookingCash = async (req, res) => {
  if (
    !req.body.client ||
    !req.body.clientName ||
    !req.body.instructor ||
    !req.body.booking ||
    !req.body.instructorName ||
    !req.body.slot ||
    !req.body.date ||
    !req.body.time ||
    !req.body.status ||
    !req.body.modeOfPayment ||
    !req.body.price ||
    !req.body.feedback ||
    !req.body.address ||
    !req.body.rating
  ) {
    res.status(400).json({ msg: 'This is not a valid data' });
  }
  let ride = new RideSchema({
    client: req.body.client,
    clientName: req.body.clientName,
    instructor: req.body.instructor,
    booking: req.body.booking,
    instructorName: req.body.instructorName,
    slot: req.body.slot,
    date: req.body.date,
    time: req.body.time,
    status: req.body.status,
    modeOfPayment: req.body.modeOfPayment,
    price: req.body.price,
    feedback: req.body.feedback,
    address: req.body.address,
    rating: req.body.rating
  });
  ride
    .save()
    .then((b) => {
      if (b) {
        res.status(200).json({ b });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

exports.allRides = (req, res) => {
  RideSchema.find({})
    .then((b) => {
      return res.status(200).json({ b: b });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err.message });
    });
};

exports.getRideById = (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ msg: 'You need to send ID!' });
  }
  RideSchema.find({ _id: req.query.id })
    .then((ride) => {
      return res.status(200).json({ ride: ride });
    })
    .catch((err) => {
      return res.status(200).json({ msg: err.message });
    });
};

// exports.feedback =  ( req , res ) => {
//     if (!req.query.feedback) {
//         return res.status(400).json({ msg: "You need to send feedback!" })
//     }
//     RideSchema.find({ feedback: req.query.feedback })
//     .then(feed => {
//         return res.status(200).json({ feed: feed });
//     })
//     .catch(err => {
//         return res.status(200).json({ msg: err.message });
//     })
// }
