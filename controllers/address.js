const ClientSchema = require('../models/UserSchema');

exports.addAddress = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.city ||
    !req.body.province ||
    !req.body.street ||
    !req.body.postalCode ||
    !req.body.id
  ) {
    res.status(400).json({ msg: 'This Is Invalid Data' });
  }
  let user = await ClientSchema.findById(req.body.id);
  if (user) {
    let address = {
      city: req.body.city,
      province: req.body.province,
      street: req.body.street,
      postalCode: req.body.postalCode
    };
    user.address.push(address);
    user
      .save()
      .then((b) => {
        if (b) {
          res.status(200).json({ b });
        }
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  }
};

exports.getAddressById = (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ msg: 'You Need To Send ID!' });
  }
  ClientSchema.findOne({ _id: req.query.id })
    .then((b) => {
      return res.status(200).json({ b: b.address });
    })
    .catch((err) => {
      return res.status(200).json({ msg: err.message });
    });
};
