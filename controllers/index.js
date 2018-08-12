const express = require('express');
const app = express();
const User = require('../models/user');
const Player = require('../models/player');
const Faction = require('../models/faction');
const Comment = require('../models/comment');


module.exports = (app) => {

    app.get('/', (req, res) => {
      let currentUser;

      Player.find({pending : false}).then((players) => {
        Faction.find({pending : false}).then((factions) => {


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



  app.get('/recent', (req, res) => {
    let currentUser;

    Player.find({pending : false}).then((players) => {
      Faction.find({pending : false}).then((factions) => {
        Comment.find({}).then((comments) => {
          Player.find({_id : comments.playerId}).then((playerName) => {


    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        res.render('index/recent', { currentUser: user, players, factions, comments, playerName });
      })
    } else {
    res.render('index/recent', { players, factions, comments, playerName });
    }
  })
  })
})
})

})



app.get('/profiles/:username', (req, res) => {
  let currentUser;


      Comment.find({username: req.params.username}).then((comments) => {


  if (req.user) {
    User.findById(req.user._id, (err, user) => {
      res.render('index/profile', { currentUser: user, comments });
    })
  } else {
  res.render('index/profile', { comments });
  }
})

})



};
