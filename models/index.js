// import Sequelize from 'sequelize';
const Sequelize = require("sequelize");
const utils = require("./utils");

const sequelize = new Sequelize('new_nb_test', 'adriansy', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define:{
    underscored: true
  }
});

const models = {
  User: sequelize.import('./Users'),
  Institution: sequelize.import('./Classes/Institutions'),
  Class: sequelize.import('./Classes/Classes'),
  Section: sequelize.import('./Classes/Sections'),
  PseudoUser: sequelize.import('./Classes/PseudoUsers'),

  Source: sequelize.import('./Annotations/Sources'),
  Location: sequelize.import('./Annotations/Locations'),
  Thread: sequelize.import('./Annotations/Threads'),
  Annotation: sequelize.import('./Annotations/Annotations'),

  TagType: sequelize.import('./AnnotationActions/TagTypes'),
  Tag: sequelize.import('./AnnotationActions/Tags'),

  FileSystemObject: sequelize.import('./FileSystem/FileSystemObjects'),

  GradingSystem: sequelize.import('./Grading/GradingSystems'),
  GradingThreshold: sequelize.import('./Grading/GradingThresholds'),
  CriteriaCount: sequelize.import('./Grading/CriteriaCounts'),
  Criteria: sequelize.import('./Grading/Criteria'),
};

Object.keys(models).forEach(function (modelName) {
  if ('classMethods' in models[modelName].options) {
   if ('associate' in models[modelName].options.classMethods) {
    models[modelName].options.classMethods.associate(models);
    }
  }
});

sequelize.drop({}).then(() =>{
sequelize.sync()
  .then(() => {
    models.User.create(
      {
        username: "adrian",
        email: "adriansy@mit.edu",
        first_name: "Adrian",
        last_name: "Sy",
        password: "t"
      }
    ).then(user_1 => {
      models.User.create(
        {
          username: "alisa",
          email: "alisao@mit.edu",
          first_name: "Alisa",
          last_name: "Ono",
          password: "t"
        }
      ).then((user_2) => 
        utils(sequelize.models).createClass("Test Class", user_2.id)
        
      ).then(nb_class => 
        utils(sequelize.models).addStudent(nb_class.id, user_1.id)
        .then(() => {
          nb_class.getRoot().then((root) => utils(sequelize.models)
          .createFile(root.id, 
            "test_link", 
            "file:///Users/adriansy/Dropbox%20(MIT)/MIT%20Sem%208/SuperUROP/nbdemo/index.html"));
        })
      );
    });
    

  })
  .catch(error => console.log('This error occured', error));
});

module.exports = sequelize.models;