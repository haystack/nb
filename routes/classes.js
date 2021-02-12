const express = require('express');
const User = require('../models').User;
const Class = require('../models').Class;
const Source = require('../models').Source;
const Section = require('../models').Section;
const utils = require('../models/utils')(require('../models'));
const multer  = require('multer');
const csv = require('csv-parser')
const fs = require('fs')
const stripBomStream = require('strip-bom-stream');
var randomstring = require("randomstring");
var upload = multer({ dest: 'uploads/' });

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
  utils.createClass(name, req.user.id)
  .then((nb_class) =>{
    res.status(200).json(nb_class);
  });
});

/**
 * Edit class.
 * @name POST/api/classes/edit
 * @param id: id of class
 */
router.post('/edit', (req, res) => {
  const id = req.body.course ? req.body.course.id : undefined;
  if (!id){
    res.status(400).json({msg: "bad id"});
    return;
  }
  utils.editClass(id, req.body.course, "").then(() => {
    res.status(200).json(req.body.course)
  });
});

/**
 * Get all classes for which current user is an instructor.
 * @name GET/api/classes/create
 */
router.get('/instructor',(req,res) =>{
  User.findByPk(req.user.id).then((user) =>
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
  User.findByPk(req.user.id).then((user) =>
    user.getMemberSections({raw: true})
  ).then((sections) => {
    return Promise.all(sections.map((section) => Class.findByPk(section.class_id)));
  }
  ).then(classes => {
    const classesIDs = classes.map(classObj => classObj["id"])
    res.status(200).json(classes.filter((value, index) => {
        return classesIDs.indexOf(value["id"]) === index
    }));
  });
});

/**
 * Get all instructors for a given class
 * @name GET/api/classes/studentList/:id
 * @param id: id of the class
 */
router.get('/instructorList/:id', (req,res) =>{
  Class.findByPk(req.params.id,
    {include:[{association: 'Instructors', attributes:['id','username','first_name','last_name','email']}]})
    .then((nb_class) =>{
      if(nb_class.Instructors.filter(instructor => instructor.id == req.user.id).length < 1){
        res.status(401).json(null);
      }
      else{
        res.status(200).json(nb_class.Instructors);
      }
    });
});

/**
 * Get all students for a given class
 * @name GET/api/classes/studentList/:id
 * @param id: id of the class
 */
router.get('/studentList/:id', (req,res) =>{
  Class.findByPk(req.params.id, { include:[
    {association: 'GlobalSection',
    include: [{association:'MemberStudents', 
      attributes:['id','username','first_name','last_name','email']}
    ]},
    {association: 'Instructors',
    required: true,
    where:{id: req.user.id}}
  ]})
    .then((nb_class) =>{
      if(nb_class){
        let ret = [];
        let counter = 0;
         
        if (nb_class.GlobalSection.MemberStudents.length === 0){
            res.status(200).json([])
        }
        
        nb_class.GlobalSection.MemberStudents.forEach((student) => { // find the section assoc. w/ each student
            Section.findOne({ where: {class_id: nb_class.id, is_global: false}, 
                include: [{
                  model: User,    
                  as: 'MemberStudents',
                  where: { id: student.id }, // filter to find a non-global section with this student
                }]
              })
              .then(function (section) {
                if (section) {
                  student.setDataValue('section', section.section_name) // TODO: find a better fix to replace this quick fix for sending up the corresponding section name
                  ret.push(student)
                } else {
                    ret.push(student)
                }
                counter = counter + 1; // make sure we get to all students before sending a response
                if (counter === nb_class.GlobalSection.MemberStudents.length) {
                    res.status(200).json(ret)
                }
            })
        })
        // res.status(200).json(nb_class.GlobalSection.MemberStudents);
      }
      else{
        res.status(401).json(null);
      }
    });
});

/**
 * Add an instructor to a given class
 * @name POST/api/classes/instructor/:id
 * @param id: id of the class
 */
router.post('/instructor/:id', (req, res) => {
  Class.findByPk(req.params.id, {include:[
    {association: 'Instructors', required:true, where:{id: req.user.id}}]})
  .then(nb_class => {
    if (!nb_class){
      res.status(401).json(null);
    }
    else{
      User.findByPk(req.body.id).then(user =>
        nb_class.addInstructor(user)
      ).then(() => res.status(200).json(null));
    }
  });
});

/**
 * Remove an instructor from a given class
 * @name DELETE/api/classes/instructor/:courseid/:userid
 * @param courseid: id of the class
 * @param userid: id of the user to remove
 */
router.delete('/instructor/:courseid/:userid', (req, res) => {
  Class.findByPk(req.params.courseid, {include:[
    {association: 'Instructors', required:true, where:{id: req.user.id}}]})
  .then(nb_class => {
    if (!nb_class){
      res.status(401).json(null);
    }
    else{
      User.findByPk(req.params.userid).then(user =>
        nb_class.removeInstructor(user)
      ).then(() => res.status(200).json(null));
    }
  });
});

/**
 * Add a student to a given class
 * @name POST/api/classes/student/:id
 * @param id: id of the class
 */
router.post('/student/:id', (req, res) => {
  Class.findByPk(req.params.id, {include:[
    {association: 'Instructors', required:true, where:{id: req.user.id}}]})
  .then(nb_class => {
    if (!nb_class){
      res.status(401).json(null);
    }
    else{
      utils.addStudent(req.params.id, req.body.id)
      .then(() => res.status(200).json(null));
    }
  });
});

/** 
 * Register and add a single user to a given class
 * @name POST/api/classes/user/:id
 * @param id: id of the class
 */
router.post('/user/:id', (req, res) => {
  Class.findByPk(req.params.id, {include:[
    {association: 'Instructors', required:true, where:{id: req.user.id}},
    {association: 'GlobalSection'}
  ]})
  .then(nb_class => {
    if (!nb_class){
      res.status(401).json(null);
    }
    else{
      User.create({
        username: req.body.email,
        first_name: req.body.first,
        last_name: req.body.last,
        email: req.body.email,
        password: randomstring.generate(),
    }).then((user) => {
      if (req.body.role === "instructor") {
        nb_class.addInstructor(user)
      } else if (req.body.role === "student") {
        utils.addStudentToSection(nb_class, user, req.body.section)
      }
      res.status(200).json(null)
    }).catch((err)=>{
      User.findOne({ where: { email: req.body.email }}).then(function (user) {
        if (user) {
          utils.addStudentToSection(nb_class, user, req.body.section)
        } else {
          res.status(400).json({msg: "Error registering user"})
        } 
      });
    })
    }
  });
});

/**
 * Add users from a CSV to a given class
 * @name POST/api/classes/upload/:id
 * @param id: id of the class
 */

router.post('/upload/:id', upload.single("file"), function(req, res) {
  Class.findByPk(req.params.id, {include:
    [
      {association: 'Instructors', required:true, where:{id: req.user.id}},
      {association: 'GlobalSection'}
    ]})
  .then(nb_class => {
    if (!nb_class){
      res.status(401).json(null);
    } else {
      const results = [];
      fs.createReadStream(req.file.path)
      .pipe(stripBomStream()) // Remove Byte Order Marks (BOM) that might be present in some CSV format files such as Excel
      .pipe(csv())
      .on('data', (data) => {results.push(data)})
      .on('end', () => {

        let requests = results.map(student_entry  => {
          return new Promise((resolve) => {
            let section = student_entry['Section']
            let email = student_entry['Email']
            if (email) {
              User.create({
                username: email,
                first_name: student_entry["First"],
                last_name: student_entry["Last"],
                email: email,
                password: randomstring.generate(),
              })
              .then((user) => {
                resolve() // resolve so that we can send a signal back to the frontend
                utils.addStudentToSection(nb_class, user, section)
              }).catch((err)=>{
                resolve()
                User.findOne({ where: { email: email }})
                  .then(function (user) {
                    if (user) {
                      utils.addStudentToSection(nb_class, user, section)
                    }
                  })
              })
            } else {
              resolve()
            }
          });
        })
        Promise.all(requests)
        .then(() => {res.status(200).json(null);}) 
        .catch((err) => {res.status(200).json(null);
        }); 
      })
    }
  });
});

/**
 * Remove a student from a given class
 * @name DELETE/api/classes/student/:courseid/:userid
 * @param courseid: id of the class
 * @param userid: id of the user to remove 
 * */
router.delete('/student/:courseid/:userid', (req, res) => {
  Class.findByPk(req.params.courseid, {include:[
    {association: 'Instructors', required:true, where:{id: req.user.id}}]})
  .then(nb_class => {
    if (!nb_class){
      res.status(401).json(null);
    }
    else{
      utils.removeStudent(req.params.courseid, req.params.userid)
      .then(() => res.status(200).json(null));
    }
  });
});

/**
 * Get all sources for current class
 * @name GET/api/classes/sourceList
 */
router.get('/sourceList', (req, res) => {
  Source.findAll({where:{class_id: req.query.classId}})
    .then(sources => res.status(200).json(sources));
});

module.exports = router;
