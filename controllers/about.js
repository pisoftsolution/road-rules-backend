const AboutSchema = require('../models/AboutSchema');

exports.addAbout = (req, res) => {
  if (!req.body.subHeading ||
    !req.body.text) {
    res.status(400).json({ msg: "This is invalid data" });
  }
  let about = new AboutSchema({
    subHeading: req.body.subHeading,
    text: req.body.text
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

exports.getAbout = (req, res) => {
  console.log(req.query);
  AboutSchema.find({})
    .then(b => {
      res.status(200).json({ b: b });
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
};

exports.updateAbout = (req, res) => { 
  AboutSchema.findById(req.query.id)
    .then(b => {
      if (b) {
        b.subHeading = req.body.subHeading;
        b.text = req.body.text;
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
