const express = require('express');
const User = require('../models').User;
const Class = require('../models').Class;
const Section = require('../models').Section;
const FileSystemObject = require('../models').FileSystemObject;
const router = express.Router();

/**
 * Create a new class.
 * @name POST/api/classes/create
 * @param name: name of class
 */
router.post('/create', (req, res) => {
  const name = req.body.name;
  if (!name){
    res.status(400).json({msg: "bad name"});
  }
  Class.create({
    class_name: name
  })
  .then((nb_class) => 
    Section.create({section_name: 'global', is_global: true})
      .then((section) => nb_class.setGlobalSection(section)
      .then((updated_nb_class) =>{
        return section.setClass(updated_nb_class);
    }))
    .then(() => User.findByPk(req.session.userId).then((user) => 
      Promise.all([
        nb_class.setCreator(user),
        nb_class.setInstructors(user),
        nb_class.getGlobalSection().then((section) => 
          section.setMemberStudents(user)
        )
      ])
    )
    .then(() => FileSystemObject.create({file_name: name, is_directory: true})
      .then((dir) => dir.setClass(nb_class)))
    )
  .then(() => nb_class))
  .then((nb_class) =>{
    res.status(200).json(nb_class);
  });
});

/**
 * Get all classes for which current user is an instructor.
 * @name GET/api/classes/create
 */
router.get('/instructor',(req,res) =>{
  User.findByPk(req.session.userId).then((user) => 
    user.getInstructorClasses()
  ).then((classes) => {
    res.status(200).json(classes);
  });
});

/**
 * Get all classes for which current user is a student.
 * @name GET/api/classes/student
 */
router.get('/student', (req,res) =>{
  User.findByPk(req.session.userId).then((user) => 
    user.getMemberSections({raw: true})
  ).then((sections) => {
    return Promise.all(sections.map((section) => Class.findByPk(section.class_id)));
  }
  ).then(classes => {
    res.status(200).json(classes.filter((value, index, self) => { 
      return self.indexOf(value) === index;
    }));
  });
});

module.exports = router;
