const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const middleware = require('../middleware/authorization');

exports.registerUser = (req, res) => {
  if (
    !req.body.email ||
    !req.body.fullName ||
    !req.body.phone ||
    !req.body.password
  ) {
    return res.status(400).json({ msg: 'Invalid Data' });
  }
  const incomingUser = {
    email : req.body.email,
    fullName : req.body.fullName,
    phone : req.body.phone ,
    password : req.body.password,
    isPhoneVerified : false,
    isEmailVerified : false,
    role: 'user',
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (user) {
      return res.status(400).json({ msg: 'The User Already Exists' });
    }
    let newUser = User(incomingUser);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(user);
    });
  });
};

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(401).json({ msg: 'User Does Not Exist' });
    } else {
      bcrypt.compare(req.body.password, user.password, (error, match) => {
        if (error) {
          res.status(500).json(error);
        } else if (match) {
          const token = jwt.sign(
            { id: user.id, email: user.email, role:user.role },
            'my-first-authorization',
            {
              expiresIn: 60 * 60 * 12 * 24
            }
          );
          return res.status(200).json({ token: token });
        } else {
          return res.status(403).json({ error: 'Passwords Do Not Match' });
        }
      });
    }
  });
};

exports.changePassword = (req, res) => {
  const token = req.headers.authorization;
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  let decodedData = JSON.parse(
    Buffer.from(base64, 'base64').toString('binary')
  );
  console.log(decodedData);
  if (decodedData.email === req.body.email) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.error(err);
        return res.status(400).json({ msg: 'Something Went Wrong' });
      }
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) {
          return res.status(400).json({ msg: err.message });
        } else {
          User.findById(decodedData.id)
            .then((user) => {
              user.password = hash;
              user
                .save()
                .then((u) => {
                  return res
                    .status(200)
                    .json({ msg: 'Password Changed Successfully' });
                })
                .catch((err) => {
                  return res.status(400).json({ msg: err.message });
                });
            })
            .catch((err) => {
              return res.status(400).json({ msg: err.message });
            });
        }
      });
    });
  } else {
    return res.status(500).json({ msg: 'You Are Not Authorized' });
  }
};

exports.test = (req, res) => {
  return res.status(200).json({ msg: 'You Are Authorized' });
};
