const ChooseSchema = require('../models/ChooseSchema');

exports.addChoose = async (req, res) => {
  if (!req.body.point) {
    res.status(400).json({ msg: 'This is invalid data' });
  }
  let about = new ChooseSchema({
    point: req.body.point
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

exports.getChoose = (req, res) => {
  ChooseSchema.findOne({})
    .then((t) => {
      return res.status(200).json({ t: t });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err.message });
    });
};

exports.updateChoose = (req, res) => {
  ChooseSchema.findById(req.query.id)
    .then((t) => {
      if (b) {
        (t.point = req.body.point),
          t.save().then((t1) => {
            res.status(200).json(t1);
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
