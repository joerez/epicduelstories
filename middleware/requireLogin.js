const User = require('../models/user');


module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({error: 'You must log in!'});
    }

    if (req.user) {
        User.findById(req.user._id, (err, user) => {
            if (user.banned) {
                res.status(401).send({error: 'You are banned!'});
            }
        })
    }
    if (req.user) {

    }
    if (!req.user.banned) {
        User.findById(req.user._id, (err, user) => {
            if (!user.banned) {
                next();
            }
        })
    }
};
