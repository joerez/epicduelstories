const User = require('../models/user');


module.exports = (req, res, next) => {
    if (req.user.mod) {
      return next();
    }
    else {
      return res.status(404).send({error: 'this does not exist!'});
    }

};
