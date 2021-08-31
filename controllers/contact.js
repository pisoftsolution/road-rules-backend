const ContactSchema = require('../models/ContactSchema');

exports.contactUs = async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.message) {
    res.status(400).json({ msg: 'This is invalid data' });
  }
  let about = new ContactSchema({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  });
  about
    .save()
    .then((t) => {
      if (t) {
        res.status(200).json({ t });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
