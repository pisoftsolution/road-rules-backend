const ClientSchema = require('../models/UserSchema');
// const AddressSchema = require('../models/UserSchema');

exports.addAddress = async (req, res) => {
  if (
    !req.body.city ||
    !req.body.province ||
    !req.body.street ||
    !req.body.postalCode ||
    !req.query.email
  ) {
    res.status(400).json({ msg: 'This Is Invalid Data' });
  }
  let user = await ClientSchema.findOne({ email: req.query.email });
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

// exports.getAddress = (req, res) => {
//   AddressSchema.find({})
//     .then((b) => {
//       return res.status(200).json({ b: b });
//     })
//     .catch((err) => {
//       return res.status(400).json({ msg: err.message });
//     });
// };

// exports.getClient = (req, res) => {
//   ClientSchema.find({})
//     .then((b) => {
//       return res.status(200).json({ b: b });
//     })
//     .catch((err) => {
//       return res.status(400).json({ msg: err.message });
//     });
// };
