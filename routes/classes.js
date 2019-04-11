const express = require('express');
const User = require('../models').User;
const Class = require('../models').Class;
const router = express.Router();

/**
 * Create a new class.
 * @name POST/api/classes/create
 */
router.post('/create', (req, res) => {
  const name = req.body.name;
  if (!name){
    res.status(400).json({msg: "bad name"});
  }
  Class.create({
    class_name: name
  }).then((nb_class) => 
    User.findByPk(req.session.userId).then((user) => 
      Promise.all([
        nb_class.setCreator(user),
        nb_class.setInstructors(user),
        nb_class.getGlobalSection().then((section) => 
          section.setMemberStudents(user)
        )
      ])
    ).then(() => nb_class)
  ).then((nb_class) =>{
    res.status(200).json(nb_class);
  });
});

/**
 * Get all classes for which current user is an instructor.
 * @name POST/api/classes/create
 */
router.get('/instructor', (req,res) =>{
  User.findByPk(req.session.userId).then((user) => 
    user.getInstructorClasses()
  ).then((classes) => {
    res.status(200).json(classes);
  })
});

/**
 * Get all classes for which current user is an instructor.
 * @name POST/api/classes/create
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
