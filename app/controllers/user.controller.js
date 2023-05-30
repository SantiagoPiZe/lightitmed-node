const db = require("../models");
const User = db.user;

exports.userInfo = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user =>
            res.status(200).send({
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
            })
        )
        .catch(err => {
            res.status(404).send({ message: err.message });
        });
}