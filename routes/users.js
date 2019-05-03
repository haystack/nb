const express = require('express');
const User = require('../models').user;
const router = express.Router();

/**
 * Get active user.
 * @name GET/api/users/current
 */
router.get('/current', (req, res) => {
  if (!req.session.userId){
    res.status(200).json(null);
    return null;
  }
  User.findByPk(req.session.userId,{attributes: ['id', 'username', 'name']}).then((user) => {
    res.status(200).json(user);
  });
});

/**
 * Get all users.
 * @name POST/api/users/all
 */
router.get('/all', (req, res) => {
  User.findAll({attributes:['id','username','name','email']}).then((users) => {
    res.status(200).json(users);
  });
});

/**
 * Set username of active user.
 * @name POST/api/users/signin
 */
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ where: { username: username }}).then(function (user) {
    if (!user) {
      res.status(401).json({msg: "No user with username " + username});
    } else if (!user.validPassword(password)) {
      res.status(401).json({msg: "Incorrect password"});
    } else {
      req.session.userId = user.id;
      res.status(200).json({username: user.username, id: user.id, name: user.name});
    }
  });
});

router.post('/register', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(() => {
    res.status(200).json({msg: "registered"});
  }).catch((err)=>{
    console.log("error:" + err);
  });

})

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ msg: "signed out" }).end();
});

module.exports = router;
