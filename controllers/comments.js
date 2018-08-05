const express = require('express');
const app = express();
const User = require('../models/user');
const Player = require('../models/player')
const Faction = require('../models/faction')
const Comment = require('../models/comment')
const requireLogin = require('../middleware/requireLogin');

let Recaptcha = require('express-recaptcha');
var recaptcha = new Recaptcha('6Ld9VWgUAAAAANMg2fEBUmbC48-Is_KZEFJ2XbBL', '6Ld9VWgUAAAAAOPH-QfoQ6j8_5PP1na-6yKNuWTB');


module.exports = (app) => {


//post new comment on player
app.post('/players/:playerid/new', requireLogin, (req, res) => {



  const commentData = {...req.body, user: req.user._id, onAPlayer: true}
  Player.findById(req.params.playerid).then((player) => {
    Comment.create(commentData).then((comment) => {
      comment.save();
      res.redirect('back')
    }).catch((err) => {
      console.log(err.message);
    })
  })

})


//post new comment on faction
app.post('/factions/:factionid/new', requireLogin, (req, res) => {
  const commentData = {...req.body, user: req.user._id, onAFaction: true}
  Faction.findById(req.params.factionid).then((faction) => {
    Comment.create(commentData).then((comment) => {
      comment.save();
      res.redirect('back')
    }).catch((err) => {
      console.log(err.message);
    })
  })

})



}
