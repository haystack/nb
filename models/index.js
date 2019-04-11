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

  Source: sequelize.import('./Annotations/Sources'),
  Location: sequelize.import('./Annotations/Locations'),
  Thread: sequelize.import('./Annotations/Threads'),
  Annotation: sequelize.import('./Annotations/Annotations'),

  Tag: sequelize.import('./AnnotationActions/Tags'),
  TagType: sequelize.import('./AnnotationActions/TagTypes')
};

//Class.getInstitution
models.Class.belongsTo(models.Institution, {as: 'Institution'});
//Class.getCreator
models.Class.belongsTo(models.User, {as: 'Creator', foreignKey: 'creator'});
//User.getCreatedClasses
models.User.hasMany(models.Class, {as: 'CreatedClasses', foreignKey: 'creator'});

//Many to many between Classes and Instructors (Users)
//Class.getInstructors, User.getInstructorClasses
models.Class.belongsToMany(models.User, {as: 'Instructors', through: 'instructors'});
models.User.belongsToMany(models.Class, {as: 'InstructorClasses', through: 'instructors'});

//Many to many between Classes and TAs (Users)
//Class.getTAs, User.getTAClasses
models.Class.belongsToMany(models.User, {as: 'ClassTAs', through: 'class_tas'});
models.User.belongsToMany(models.Class, {as: 'TAClasses', through: 'class_tas'});

//One to one between Classes and Sections (Global Section)
//Class.getSections
models.Class.hasMany(models.Section, {as: 'Sections', foreignKey: {name: 'class_id'}, onDelete: 'CASCADE'});
//Section.getClass
models.Section.belongsTo(models.Class, {as: 'Class', foreignKey: {name: 'class_id'}, onDelete: 'CASCADE'});
//Class.getGlobalSection, Class.setGlobalSection
models.Class.belongsTo(models.Section, {as: 'GlobalSection', foreignKey: {name: 'global_section_id'}, constraints: false}); 



//Many to many between Sections and TAs (Users)
//User.getTASections, Section.getTAs
models.Section.belongsToMany(models.User, {as: 'SectionTAs', through: 'section_tas'});
models.User.belongsToMany(models.Section, {as: 'TASections', through: 'section_tas'});
//Many to many between Sections and Students (Users)
//User.getMemberSections, Section.getMemberStudents
models.Section.belongsToMany(models.User, {as: 'MemberStudents', through: 'student'});
models.User.belongsToMany(models.Section, {as: 'MemberSections', through: 'student'});
//Many to many between Sections and Invited Students (Users)
//User.getInvitedSection, Section.getInvitedStudents
models.Section.belongsToMany(models.User, {as: 'InvitedStudents', through: 'invited_students'});
models.User.belongsToMany(models.Section, {as: 'InvitedSections', through: 'invited_students'});

models.Class.beforeCreate('globalSectionCreation', (nb_class) => {
  console.log(nb_class);
  console.log("Creating and setting global section");
  models.Section.create({section_name: 'global', is_global: true})
    .then((section) => nb_class.setGlobalSection(section)
    .then((updated_nb_class) =>{
      console.log("global section has been set");
      console.log(updated_nb_class);
      return section.setClass(updated_nb_class);
    }));
});


//Source.getLocations
models.Source.hasMany(models.Location, {as: 'Locations', foreignKey: {name: 'source_id', allowNull: false}, onDelete: 'CASCADE'});
//Location.getSource
models.Location.belongsTo(models.Source, {as: 'Source', foreignKey: {name: 'source_id', allowNull: false}, onDelete: 'CASCADE'});
//Thread.getLocation
models.Thread.belongsTo(models.Location, {as: 'Location'});
//Thread.getHeadAnnotation
models.Thread.belongsTo(models.Annotation, {as: 'HeadAnnotation', foreignKey:{allowNull: false}, constraints: false,});
//Annotation.getThread
models.Annotation.belongsTo(models.Thread, {as: 'Thread', foreignKey:{allowNull: false}, onDelete:'CASCADE'});
//Annotation.getParent
models.Annotation.hasOne(models.Annotation, {as: 'Parent', onDelete: 'CASCADE'});
//Annotation.getAuthor
models.Annotation.belongsTo(models.User, {as: 'Author', foreignKey:{name: 'author_id', allowNull: false}, onDelete:'CASCADE'});
//User.getAnnotations
models.User.hasMany(models.Annotation, {as: 'Annotations', foreignKey:{name: 'author_id', allowNull: false}, onDelete:'CASCADE'});


//Annotation.getTags
models.Annotation.hasMany(models.Tag, {as:'Tags', foreignKey:{allowNull: false}, onDelete: 'CASCADE'});
//Tag.getTagType
models.Tag.belongsTo(models.TagType, {as:'TagType', foreignKey:{allowNull: false}, onDelete: 'CASCADE'});
//TagType.getTags
models.TagType.hasMany(models.Tag, {as:'Tags', foreignKey:{allowNull: false}, onDelete: 'CASCADE'});

models.Annotation.belongsToMany(models.User, {as:'ReplyRequesters', through:'reply_requests'});
models.User.belongsToMany(models.Annotation, {as:'ReplyRequestedAnnotations', through:'reply_requests'});
models.Annotation.belongsToMany(models.User, {as:'TaggedUsers', through:'user_tags'});
models.User.belongsToMany(models.Annotation, {as:'TaggedAnnotations', through:'user_tags'});
models.Annotation.belongsToMany(models.User, {as:'Bookmarkers', through:'bookmarks'});
models.User.belongsToMany(models.Annotation, {as:'BookmarkedAnnotations', through:'bookmarks'});
models.Annotation.belongsToMany(models.User, {as:'Starrers', through:'stars'});
models.User.belongsToMany(models.Annotation, {as:'StarredAnnotations', through:'stars'});


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
})

module.exports = models;