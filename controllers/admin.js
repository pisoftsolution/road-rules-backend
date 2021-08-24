const User = require('../models/Slot');
// const middleware = require('../middleware/authorization'); 

exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
        return res.status(200).json({ users: users })
    })
    .catch(err => {
        return res.status(400).json({ msg: err.message })
    })
}

exports.getUserById = (req, res) => {
    if (!req.query.id) {
        return res.status(400).json({ msg: "You Need To Send ID!" })
    }
    User.find({ _id: req.query.id })
    .then(user => {
        return res.status(200).json({ user: user });
    })
    .catch(err => {
        return res.status(200).json({ msg: err.message });
    })
}