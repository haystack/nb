const express = require('express');
const FileSystemObject = require('../models').FileSystemObject;
const router = express.Router();

/**
 * Gets root level file of class 
 * @name GET/api/files/class/:id
 * @param id: id of class
 */
router.get('/class/:id', (req, res) => {
  FileSystemObject.findOne({where:{class_id: req.params.id}}).then((file) => {
    res.status(200).json(file);
  });
});

/**
 * Gets child file of directory 
 * @name GET/api/files/folder/:id
 * @param id: id of directory
 */
router.get('/folder/:id', (req, res) => {
  FileSystemObject.findByPk(req.params.id)
  .then((file) => file.getChildren())
  .then((files) => {
    res.status(200).json(files);
  });
});

/**
 * Creates child directory of current directory
 * @name POST/api/files/folder/:id
 * @param id: id of parent directory
 * @param name: name of child directory
 */
router.post('/folder/:id', (req, res) => {
  FileSystemObject.findByPk(req.params.id)
  .then((folder) => 
    FileSystemObject.create({file_name: req.body.name}).then((child) => child.setParent(folder))
  )
  .then((child) => {
    res.status(200).json(child);
  });
});

module.exports = router;