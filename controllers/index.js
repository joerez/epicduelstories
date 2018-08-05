const express = require('express');
const app = express();
const User = require('../models/user');
const Player = require('../models/player');
const Faction = require('../models/faction');


module.exports = (app) => {

    app.get('/', (req, res) => {
      let currentUser;

      Player.find({pending : true}).then((players) => {
        Faction.find({pending : true}).then((factions) => {


      if (req.user) {
        User.findById(req.user._id, (err, user) => {
          res.render('index/index', { currentUser: user, players, factions });
        })
      } else {
      res.render('index/index', { players, factions });
      }
    })
    })
  })
};
