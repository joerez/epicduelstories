const express = require('express');
const app = express();
const User = require('../models/user');
const Faction = require('../models/faction');
const Comment = require('../models/comment');

const requireLogin = require('../middleware/requireLogin');

const moment = require('moment');

let Recaptcha = require('express-recaptcha');
var recaptcha = new Recaptcha('6Ld9VWgUAAAAANMg2fEBUmbC48-Is_KZEFJ2XbBL', '6Ld9VWgUAAAAAOPH-QfoQ6j8_5PP1na-6yKNuWTB');


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


  //post new faction
  app.post('/factions/new', requireLogin, (req, res) => {
    Faction.findOne({ name : req.body.name }, 'name').then((faction) => {
      if (faction) {
        // faction found
        return res.status(401).send({ message: 'Faction already exists' });
      }
    })

    let newFaction = new Faction(req.body);
    newFaction.name = req.body.name;
    newFaction.description = req.body.description;
    newFaction.imgurl = req.body.imgurl;
    newFaction.pending = true;
    console.log(req.body);

    recaptcha.verify(req, function(error, data){
         if(!error)
             //success code
             {
               newFaction.save((err, newfaction) => {
                 if(err)  throw err
                 res.redirect('/');
               })
             }
         else
             //error code
             {
               res.send('fill out the captcha');
             }
     });
  });


  app.get('/factions/:factionName', (req, res) => {

    Faction.find({name : req.params.factionName}).then((factions) => {
    Comment.find({factionId : factions[0]._id}).then((comments) => {

      for (let i = 0; i < comments.length; i++) {
        comments[i].day = moment(comments[i].initialTime, "YYYYMMDD h:mm:ss a").fromNow();
        comments[i].save();
      }


    let currentUser;
    if (req.user) {
      User.findById(req.user._id, (err, user) => {

        res.render('factions/factionshow', {currentUser: user, factions, comments});
      })
    } else {
    res.render('factions/factionshow', { factions, comments });
    }
  })
  })
  })





  //get faction by id
  app.get('/factionsid/:factionid', (req, res) => {

    Faction.find({_id : req.params.factionid}).then((factions) => {
    Comment.find({factionId : factions[0]._id}).then((comments) => {


    let currentUser;
    if (req.user) {
      User.findById(req.user._id, (err, user) => {

        res.render('factions/factionshow', {currentUser: user, factions, comments});
      })
    } else {
    res.render('factions/factionshow', { factions, comments });
    }
  })
  })
  })





}
