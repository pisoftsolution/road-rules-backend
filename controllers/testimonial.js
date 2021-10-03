const TestimonialSchema = require('../models/TestimonialSchema');

exports.addTestimonial = (req, res) => {
  if (!req.body.name ||
    !req.body.comment) {
    res.status(400).json({ msg: "This is invalid data" });
  }
  let about = new TestimonialSchema({
    name: req.body.name,
    comment: req.body.comment
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

exports.getTestimonial = (req, res) => {
  console.log(req.query);
  TestimonialSchema.find({})
    .then(b => {
      res.status(200).json({ b: b });
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
};

exports.updateTestimonial = (req, res) => {
  TestimonialSchema.findById(req.query.id)
    .then(b => {
      if (b) {
        b.name = req.body.name;
        b.comment = req.body.comment;
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


















