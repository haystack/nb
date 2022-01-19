const express = require('express');
const router = express.Router();
const Followers = require('../models').Followers;
const User = require('../models').User;


/**
 * Get all followings  
 * @name GET/api/follow/user
 */
 router.get('/user', (req, res) => {
  Followers.findAll({ where: { user_id: req.user.id}})
    .then(function (follows) {
      res.status(200).json( follows );
    }).catch((err) => {
      console.log("error:" + err);
      res.status(400).json({ msg: err.errors[0].message })
    })
})

/**
 * Follow user
 * @name POST/api/follow/user
 * @param username: username to follow 
 */
 router.post('/user', (req, res) => {
    if (!req.body.username) {
      res.status(401).json(null);
      return null;
    }
    User.findOne({ where: { username: req.body.username }})
      .then(function (user) {
        if (!user) {
          res.status(400).json({ msg: "user does not exist" });
          return null;
        } else if (user.id === req.user.id){
          res.status(401).json({msg: "You cannot follow yourself"});
        } else {
          Followers.create({
            user_id: req.user.id,
            follower_id: user.id
          }).then(() => {
            res.status(200).json({ msg: "followed" });
          }).catch((err) => {
            console.log("error:" + err);
            res.status(400).json({ msg: err.errors[0].message })
          })
        }
      });
  })

/**
 * Unfollow user
 * @name DELETE/api/follow/user
 * @param username: username to unfollow 
 */
 router.delete('/user', (req, res) => {
  if (!req.body.username) {
    res.status(200).json(null);
    return null;
  }
  User.findOne({ where: { username: req.body.username }})
    .then(function (user) {
      if (!user) {
        res.status(200).json(null);
        return null;
      } else if (user.id === req.user.id){
        res.status(401).json({msg: "You cannot unfollow yourself"});
      } else {
        Followers.destroy({where:{
          user_id: req.user.id,
          follower_id: user.id
        }}).then(() => {
          res.status(200).json({ msg: "unfollowed" });
        }).catch((err) => {
          console.log("error:" + err);
          res.status(400).json({ msg: err.errors[0].message })
        })
      }
    });
});


  
  // /**
  //  * Get all users.
  //  * @name POST/api/users/all
  //  */
  // router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  //   User.findAll({ attributes: ['id', 'username', 'name', 'email'] }).then((users) => {
  //     res.status(200).json(users);
  //   });
  // });

  module.exports = router;
