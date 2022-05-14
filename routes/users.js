const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const router = express.Router();
const transporter = require('../email-config');
const { v4: uuidv4 } = require('uuid');
const donenv = require('dotenv');
const { Op } = require("sequelize");

donenv.config();

/**
 * Get active user based on the id given in the request
 * @name POST/api/users/getuser
 */
router.post('/getuser', (req, res) => {
  if (!req.body.id) {
    res.status(200).json(null);
    return null;
  }
  User.findOne({ where: { reset_password_id: req.body.id }, include: [{ association: 'Consents' }, { association: 'Dissents' }] })
    .then(function (user) {
      if (!user) {
        res.status(200).json(null);
        return null;
      } else {
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      }
    });
})

/**
 * Get user
 * @name GET/api/users/getuser
 */
 router.get('/user/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id }})
    .then(function (user) {
      if (!user) {
        res.status(200).json(null);
        return null;
      } else {
        res.status(200).json(user);
      }
    });
})

/**
 * Get all users.
 * @name POST/api/users/all
 */
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findAll({ attributes: ['id', 'username', 'name', 'email'] }).then((users) => {
    res.status(200).json(users);
  });
});

/**
 * Set username of active user.
 * @name POST/api/users/signin
 */
router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ where: { username: { [Op.iLike]: username } }, include: [{ association: 'Consents' }, { association: 'Dissents' }] })

  if (!user) {
    res.status(401).json({ msg: "No user with username " + username });
  } else if (!user.validPassword(password)) {
    res.status(401).json({ msg: "Incorrect password" });
  } else {
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  }
});

router.post('/register', (req, res) => {
  User.create({
    username: req.body.username,
    first_name: req.body.first,
    last_name: req.body.last,
    email: req.body.email.toLowerCase(),
    password: req.body.password
  }).then(() => {
    res.status(200).json({ msg: "registered" });
  }).catch((err) => {
    console.log("error:" + err);
    res.status(400).json({ msg: err.errors[0].message })
  })
});

router.post('/forgotpassword', (req, res) => {
  var reset_password_id = uuidv4();
  var link = req.headers.origin + "/#/forgotpassword?id=" + reset_password_id;

  User.findOne({ where: { email: { [Op.iLike]: req.body.email } } }).then(function (user) {
    if (!user) {
      res.status(401).json({ msg: "No user with email " + req.body.email });
    } else {
      user.update({
        reset_password_id: reset_password_id
      })
      var mailOptions = {
        from: 'nbv2.mailer@gmail.com',
        to: req.body.email.toLowerCase(),
        subject: 'NB V2 - Forgot Your Password',
        text: 'Hello ' + user.username + '!\n\nYou indicated that you have forgotten your password for NB V2.' +
          '\n\nPlease click on this link to reset your password: \n' + link +
          '\n\nIf you believe that this is a mistake, please contact us or change your password on your user settings page.'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error sending mail: " + error);
          res.status(400).json({ msg: "Error sending email" })
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ email: req.body.email });
        }
      });
    }
  });
});

router.put('/editPersonal', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find the current user first
  if (!req.user.id) {
    res.status(200).json(null);
    return null;
  }
  User.findByPk(req.user.id, { attributes: ['id', 'username', 'name'] }).then((user) => {
    if (!user) {
      res.status(401).json({ msg: "Cannot find user " })
    } else {
      user.update({
        first_name: req.body.first,
        last_name: req.body.last,
        email: req.body.email.toLowerCase(),
        username: req.body.username,
        // profile_photo: req.body.profilephoto
      }).then((updatedUser) => {
        const token = jwt.sign({ user: updatedUser }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      }).catch((err) => {
        console.log("error: " + err);
        res.status(400).json({ msg: "Username or email already taken. Please provide another one." })
      })
    }
  });
});

router.put('/editAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
  // find the current user first
  if (!req.user.id) {
    res.status(200).json(null);
    return null;
  }
  User.findByPk(req.user.id, { attributes: ['id', 'username', 'name'] }).then((user) => {
    if (!user) {
      res.status(401).json({ msg: "Cannot find user " })
    } else {
      user.update({
        password: req.body.newpassword,
        reset_password_id: null,
      }).then(() => {
        res.status(200).json({ msg: "editted auth password" })
      }).catch((err) => {
        console.log("error:" + err);
        res.status(400).json({ msg: "Error editting password" })
      })
    }
  });
});

router.post('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.user);
  req.logout();
  res.status(200).json({ msg: "signed out" }).end();
});

module.exports = router;
