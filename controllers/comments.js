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

  recaptcha.verify(req, function(error, data){
       if(!error)
           //success code
           {
             Player.findById(req.params.playerid).then((player) => {
               const commentData = {...req.body, user: req.user._id, onAPlayer: true, playerUserName: player.username}

               Comment.create(commentData).then((comment) => {
                 comment.save();
                 res.redirect('back')
               }).catch((err) => {
                 console.log(err.message);
               })
             })
           }
       else
           //error code
           {
             res.send('fill out the captcha');
           }
   });



})


//post new comment on faction
app.post('/factions/:factionid/new', requireLogin, (req, res) => {


  recaptcha.verify(req, function(error, data){
       if(!error)
           //success code
           {
             Faction.findById(req.params.factionid).then((faction) => {
               const commentData = {...req.body, user: req.user._id, onAFaction: true, factionName: faction.name}

               Comment.create(commentData).then((comment) => {
                 comment.save();
                 res.redirect('back')
               }).catch((err) => {
                 console.log(err.message);
               })
             })
           }
       else
           //error code
           {
             res.send('fill out the captcha');
           }
   });









})



}
