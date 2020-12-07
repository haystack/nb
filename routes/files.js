const express = require('express');
const FileSystemObject = require('../models').FileSystemObject;
const Assignment = require('../models').Assignment;
const router = express.Router();
const utils = require('../models/utils')(require('../models'));

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
  .then((file) => file.getChildren({include:[{association:'Source', include:[{association:'Assignment', required: false}]}]}))
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
  .then((file) => file.getParent({include:[{association:'Parent'}]}))
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
  FileSystemObject.findByPk(req.params.id, {include: [{association: "Class"}]})
  .then((folder) =>
    FileSystemObject.create({filename: req.body.name})
      .then((child) => child.setParent(folder))
      .then((child) => child.setClass(folder.Class))
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
 * @param url: url of child file, if html
 */
router.post('/file/:id', (req, res) => {
  utils.createFile(req.params.id, req.body.name, req.body.url)
  FileSystemObject.findByPk(req.params.id)
  .then((child) => {
    res.status(200).json(child);
  });
});

/**
 * Delete of file
 * @name POST/api/files/file/delete/:id
 * @param id: id of file
 */
router.post('/file/delete/:id', (req, res) => {
  FileSystemObject.findByPk(req.params.id, { include: [{
    association: 'Source',
    include: [{ association:'Assignment', required: false }],
  }]}).then((file) => {
    file.destroy().then(() => {
      res.status(200).json({})
    })
  })
})

/**
 * Update fields of file
 * @name POST/api/files/file/update/:id
 * @param id: id of file
 * @param deadline: assignment deadline of file
 */
router.post('/file/update/:id', (req, res) => {
  FileSystemObject.findByPk(req.params.id, { include: [{
    association: 'Source',
    include: [{ association:'Assignment', required: false }],
  }]})
  .then((file) => {
    let updateDeadline = ()=>{
      if (file.Source.Assignment) {
          file.Source.Assignment.update({
            deadline: new Date(req.body.deadline)
          }).then(()=>{
            res.status(200).json(file);
          });
      } 
      else {
          Assignment.create({
            deadline: new Date(req.body.deadline),
            source_id: file.Source.id,
          }).then(()=>{
            res.status(200).json(file);
          });
      }
        
    }
    
    
    file.update({
      filename: req.body.filename
    }).then(()=>{
      if(file.Source) {
   
        file.Source.update({
          filepath: req.body.filepath, 
          filename: req.body.filename,
        }).then(()=> {
   
          if(req.body.deadline) updateDeadline()
          else res.status(200).json(file);
        })
      }
      else {
     
        if(req.body.deadline) updateDeadline()
        else res.status(200).json(file);
      }
    })
    
    
  });
});

module.exports = router;
