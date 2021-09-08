const User = require('../models/UserSchema');

exports.getUsers = (req, res) => {
  console.log(req.query);
  User.find({})
    .then(b => {
      if (b) {
        res.status(200).json({ b });
      }
    })
    .catch(err => {
      res.status(400).json({ err }); 
    })
};

exports.getUserById = (req, res) => {
  User.findById(req.query.id)
    .then(b => {
      if (b) {
        res.status(200).json({ b });
      }
    })
    .catch(err => {
      res.status(400).json({ err });
    })
};

