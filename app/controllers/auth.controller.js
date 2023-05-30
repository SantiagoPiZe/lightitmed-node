const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.fullName,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then( user => {
    return res.status(200).send()
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });


    res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        accessToken: token
    });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
