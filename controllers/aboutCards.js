const AboutCardsSchema = require('../models/AboutCardsSchema');

exports.addAboutCards = async (req, res) => {
  if (!req.body.subHeading || !req.body.text) {
    res.status(400).json({ msg: 'This is invalid data' });
  }
  let about = new AboutCardsSchema({
    subHeading: req.body.subHeading,
    text: req.body.text
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

exports.getAboutCards = (req, res) => {
  AboutCardsSchema.findOne({})
    .then((t) => {
      return res.status(200).json({ t: t });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err.message });
    });
};

exports.updateAbout = (req, res) => {
  AboutCardsSchema.findById(req.query.id)
    .then((t) => {
      if (b) {
        (t.subHeading = req.body.subHeading),
          (t.text = req.body.text),
          t.save().then((t1) => {
            res.status(200).json(t1);
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
