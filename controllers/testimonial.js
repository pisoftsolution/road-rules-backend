const TestimonialSchema = require('../models/TestimonialSchema');

exports.addTestimonial = async (req, res) => {
  if (!req.body.name || !req.body.comment) {
    res.status(400).json({ msg: 'This is invalid data' });
  }
  let testimonial = new TestimonialSchema({
    name: req.body.name,
    comment: req.body.comment
  });
  testimonial
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

exports.getTestimonial = (req, res) => {
  TestimonialSchema.findOne({})
    .then((t) => {
      return res.status(200).json({ t: t });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err.message });
    });
};

exports.updateTestimonial = (req, res) => {
  TestimonialSchema.findById(req.query.id)
    .then((t) => {
      if (b) {
        (t.name = req.body.name),
          (t.comment = req.body.comment),
          t.save().then((t1) => {
            res.status(200).json(t1);
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
