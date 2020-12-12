const express = require('express');
const User = require('../models').User;
const router = express.Router();
var generator = require('generate-password');
const transporter = require('../email-config');


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

router.post('/forgotpassword', (req, res) => {
  var password = generator.generate({
    length: 20,
    numbers: true,
  });
  User.findOne({ where: { email: req.body.email }}).then(function (user) {
    if (!user) {
      res.status(401).json({msg: "No user with email " + req.body.email});
    } else {
      user.update({
        password: password
      })
      var mailOptions = {
        from: 'helen.nbv2@gmail.com',
        to: req.body.email,
        subject: 'NB V2 - Forgot Your Password',
        text: 'Hello ' + user.username + '!\n\nYou indicated that you have forgotten your password for NB V2.' + 
        '\n\nHere is your temporary password: \n' + password + 
        '\n\nBe sure to change your password to a secure password after recovering your account.' + 
        '\n\nIf you believe that this is a mistake, please contact us at nb@mit.edu or change your password on your user settings page.'
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({email: req.body.email});
        }
      });
    }
  });
});

router.post('/register', (req, res) => {
  User.create({
    username: req.body.username,
    first_name: req.body.first,
    last_name: req.body.last,
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
