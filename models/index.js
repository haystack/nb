// import Sequelize from 'sequelize';
const Sequelize = require("sequelize");

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

  FileSystemObject: sequelize.import('./FileSystem/FileSystemObjects')
};

Object.keys(models).forEach(function (modelName) {
  if ('classMethods' in models[modelName].options) {
   if ('associate' in models[modelName].options.classMethods) {
    models[modelName].options.classMethods.associate(models);
    }
  }
});

sequelize.drop({}).then(() =>{
sequelize.sync({force: true})
  .then(() => {
    models.User.create({
      username: "adrian",
      email: "adriansy@mit.edu",
      password: "t"
    });

  })
  .catch(error => console.log('This error occured', error));
});

module.exports = models;