const express = require('express');
const FileSystemObject = require('../models').file_system_object;
const Source = require('../models').source;
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
 * Gets child files of directory 
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
 * Gets parent of current folder
 * @name GET/api/files/parent/:id
 * @param id: id of folder
 */
router.get('/parent/:id', (req, res) => {
  FileSystemObject.findByPk(req.params.id)
  .then((file) => file.getParent())
  .then((file) => {
    res.status(200).json(file);
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
    FileSystemObject.create({filename: req.body.name}).then((child) => child.setParent(folder))
  )
  .then((child) => {
    res.status(200).json(child);
  });
});

/**
 * Creates child file of current directory
 * @name POST/api/files/file/:id
 * @param id: id of parent directory
 * @param name: name of child file
 */
router.post('/file/:id', (req, res) => {
  FileSystemObject.findByPk(req.params.id)
  .then((folder) => 
    FileSystemObject.create({filename: req.body.name, is_directory: false})
      .then((child) => 
        Promise.all([
          child.setParent(folder),
          Source.create({filepath: req.body.url, filename: req.body.name}).then((source) => {
            child.setSource(source);
          })
        ])
      )
  )
  .then((child) => {
    res.status(200).json(child);
  });
});

module.exports = router;