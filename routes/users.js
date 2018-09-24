const express = require('express');

const router = express.Router();

/**
 * Set username of active user.
 * @name POST/api/users/signin
 */
router.post('/signin', (req, res) => {
  req.session.username = req.body.username;
  res.status(200).json(req.body.username).end();
});

/**
 * Set username of active user.
 * @name POST/api/users/signin
 */
router.post('/signout', (req, res) => {
  req.session.username = "";
  res.status(200).json({ msg: "signed out" }).end();
});

module.exports = router;
