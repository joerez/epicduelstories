const express = require('express');
const app = express();
const User = require('../models/user');

module.exports = (app) => {

  app.get('/factions/new', (req, res) => {
    let currentUser;
    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        res.render('factions/newfaction', {currentUser: user});
      })
    } else {
    res.render('auth/login');
    }
  })

}
