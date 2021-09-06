const ChooseSchema = require('../models/ChooseSchema');

exports.addChoose = (req, res) => {
  if (!req.body.point) {
    res.status(400).json({ msg: "This is invalid data" });
  }
  let about = new ChooseSchema({
    point: req.body.point,
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

exports.getChoose = (req, res) => {
  console.log(req.query);
  ChooseSchema.find({})
    .then(b => {
      res.status(200).json({ b: b });
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
};

exports.updateChoose = (req, res) => {
  ChooseSchema.findById(req.query.id)
    .then(b => {
      if (b) {
        b.point = req.body.point;
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
