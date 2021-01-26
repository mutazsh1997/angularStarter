const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Auth = require("../model/auth");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Auth({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save().then(() => {
                res.status(201).json({
                    message: "userCreated",
                });
            }).catch(err => {
                res.status(500).json({
                    message: 'Invalid authentication try anthor Email or signin this Email is already token'
                })
            })
        });
}

exports.login = (req, res, next) => {
    let fetchUser;
    Auth.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed",
                })
            }
            fetchUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed",
                });
            }
            const webtoken = jwt.sign(
                {
                    userId: fetchUser._id,
                    name: fetchUser.name,
                    email: fetchUser.email,
                },
                "THIS_IS_THE_SECRET_KEY",
                { expiresIn: "1h" }
            );
            const userData = {
                name: fetchUser.name,
                userId: fetchUser._id,
                email: fetchUser.email
            };

            res.status(200).json({
                token: webtoken,
                expiresIn: 3600,
                userData: userData,
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Invalid authentication credentionls!'
            })
        });

}