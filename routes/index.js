const express = require('express');

const Shorts = require('../models/Shorts');

const router = express.Router();

/**
 * Serves homepage.
 * @name GET/
 */
router.get('/', (req, res) => {
  res.render('index', { title: 'Fritter' });
});

/**
 * Access short URL.
 * @name GET/:shortName
 */
router.get('/:shortName', (req, res) => {
  const short = Shorts.findOne(req.params.shortName);
  if (short === undefined) {
    res.status(404).json({
      error: `Short URL ${req.params.shortName} not found.`,
    }).end();
  } else {
    res.redirect(short.url);
  }
});

module.exports = router;
