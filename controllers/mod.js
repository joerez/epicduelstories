const express = require('express');
const app = express();
const User = require('../models/user');
const Player = require('../models/player');
const Faction = require('../models/faction');
const Comment = require('../models/comment');


const admin = require('../middleware/admin');


module.exports = (app) => {

    app.get('/mod', (req, res) => {
      let currentUser;

      Player.find({pending : true}).then((players) => {
        Faction.find({pending : true}).then((factions) => {


      if (req.user) {
        User.findById(req.user._id, (err, user) => {
          if (user.mod) {
            res.render('index/mod', { currentUser: user, players, factions });
          } else {
            res.send('no');
          }
        })
      } else {
      res.send('no');
      }
    })
    })
  })




  // CREATE (APPROVE) PLAYER
  app.post('/players/:playerid', (req, res) => {

    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        if (user.mod) {
          Player.findById(req.params.playerid, (err, player) => {
            player.pending = false;
            player.save((err,player) => {
              if(err) throw err;
              res.redirect('back');
            })
          })

        } else {
          res.send('no')
        }


      })
    }
  })

  // CREATE (APPROVE) Faction
  app.post('/factions/:factionid',  (req, res) => {
    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        if (user.mod) {
          Faction.findById(req.params.factionid, (err, faction) => {
            faction.pending = false;
            faction.save((err,faction) => {
              if(err) throw err;
              res.redirect('back');
            })
          })

        } else {
          res.send('no')
        }


      })
    }
  })

  //ADD NEW MOD
  app.post('/mod/adminadd',  (req, res) => {
    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        if (user.mod) {
          User.findOne({username: req.body.addAdmin}, (err, user) => {
            user.admin = true;
            user.save((err, user) => {
              console.log(user);
              res.redirect('/mod');
            })
          })
        } else {
          res.send('no')
        }
      })
    }
  })

  //ADD NEW MOD
  app.post('/mod/banplayer',  (req, res) => {
    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        if (user.mod) {
          User.findOne({username: req.body.banPlayer}, (err, user) => {
            if (user.banned = false) {
              user.banned = true;
            } else {
              user.banned = false;
            }
            user.save((err, user) => {
              console.log(user);
              res.redirect('/mod');
            })
          })
        } else {
          res.send('no')
        }
      })
    }
  })


  // DELETE Player
app.post('/players/delete/:id', function (req, res) {

  if (req.user) {
    User.findById(req.user._id, (err, user) => {
      if (user.mod) {
        Player.findByIdAndRemove(req.params.id).then((player) => {
          res.redirect('back');
        }).catch((err) => {
          console.log(err.message);
        })
      }
    })
  } else {
      res.send('no');
    }
  })


  // DELETE Faction
app.post('/factions/delete/:id', function (req, res) {

  if (req.user) {
    User.findById(req.user._id, (err, user) => {
      if (user.mod) {
        Faction.findByIdAndRemove(req.params.id).then((faction) => {
          res.redirect('back');
        }).catch((err) => {
          console.log(err.message);
        })
      }
    })
  } else {
      res.send('no');
    }
  })




  // DELETE comment
app.post('/comments/delete/:commentid', function (req, res) {

  if (req.user) {
    User.findById(req.user._id, (err, user) => {
      if (user.mod) {
        Comment.findByIdAndRemove(req.params.commentid).then((comment) => {
          res.redirect('back');
        }).catch((err) => {
          console.log(err.message);
        })
      }
    })
  } else {
      res.send('no');
    }
  })





  //EDIT PLAYER PAGE
  app.get('/players/:playername/edit', (req, res) => {

    Player.find({username : req.params.playername}).then((players) => {
      console.log(players.id);
    Comment.find({ playerId : players[0].id }).then((comments) => {


    let currentUser;
    if (req.user) {
      User.findById(req.user._id, (err, user) => {

        res.render('players/editplayer', {currentUser: user, players});
      })
    } else {
    res.send('no');
    }
  })
  })
  })




  //UPDATE PLAYER
  app.post('/players/:id/edit', (req, res) => {
    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        if (user.mod) {


               Player.findByIdAndUpdate(req.params.id, req.body).then((player) => {
                 res.redirect('back')
               }).catch((err) => {
                 console.log(err.message)

               })
             }
         else
             //error code
             {
               res.redirect('/robot');
             }
     });


  }

})








}
