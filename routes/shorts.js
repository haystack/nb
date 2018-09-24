const express = require('express');

const Shorts = require('../models/Shorts');

const router = express.Router();


/**
 * Create a short.
 * @name POST/api/shorts
 * @param {string} name - name of short (link will be /:short)
 * @param {string} url - link short points to
 * @return {Short} - the created short
 * @throws {400} - if name is already taken
 */
router.post('/', (req, res) => {
  if (Shorts.findOne(req.body.name) !== undefined) {
    res.status(400).json({
      error: `Short URL ${req.body.name} already exists.`,
    }).end();
  } else {
    const short = Shorts.addOne(req.body.name, req.body.url, req.session.username);
    res.status(200).json(short).end();
  }
});

/**
 * List all shorts.
 * @name GET/api/shorts
 * @return {Short[]} - list of shorts
 */
router.get('/', (req, res) => {
  res.status(200).json(Shorts.findAll()).end();
});

/**
 * Update a short.
 * @name PUT/api/shorts/:name
 * :name is the name of the short
 * @param {string} url - the new URL to point to
 * @return {Short} - the updated short
 * @throws {404} - if short does not exist
 */
router.put('/:name', (req, res) => {
  const short = Shorts.findOne(req.params.name);
  if (short === undefined) {
    res.status(404).json({
      error: `Short URL ${req.params.name} does not exist.`,
    }).end();
  } 
  // TODO: Uncomment this code to restrict edit permissions
  // else if (short.creator !== req.session.username) {
  //   res.status(401).json({
  //     error: `You did not create ${req.params.name} and thus, cannot edit it.`,
  //   }).end();
  // }
  else {
    const newShort = Shorts.updateOne(req.params.name, req.body.url);
    res.status(200).json(newShort).end();
  }
});

/**
 * Delete a short.
 * @name DELETE/api/shorts/:name
 * :name is the name of the short
 * @return {Short} - the deleted short
 * @throws {404} - if short does not exist
 */
router.delete('/:name', (req, res) => {
  const short = Shorts.findOne(req.params.name);
  if (short === undefined) {
    res.status(404).json({
      error: `Short URL ${req.params.name} does not exist.`,
    }).end();
  } 
  // TODO: Uncomment this code to restrict delete permission
  // else if (short.creator !== req.session.username) {
  //   res.status(401).json({
  //     error: `You did not create ${req.params.name} and thus, cannot delete it.`,
  //   }).end();
  // } 
  else {
    const newShort = Shorts.deleteOne(req.params.name);
    res.status(200).json(newShort).end();
  }
});

module.exports = router;
