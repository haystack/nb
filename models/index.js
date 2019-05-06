// import Sequelize from 'sequelize';
const Sequelize = require("sequelize");
const utils = require("./utils");

// const sequelize = new Sequelize('new_nb_test', 'alisa', '', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   define:{
//     underscored: true
//   }
// });

// const models = {
//   User: sequelize.import('./Users'),
//   Institution: sequelize.import('./Classes/Institutions'),
//   Class: sequelize.import('./Classes/Classes'),
//   Section: sequelize.import('./Classes/Sections'),
//   PseudoUser: sequelize.import('./Classes/PseudoUsers'),
//
//   Source: sequelize.import('./Annotations/Sources'),
//   Location: sequelize.import('./Annotations/Locations'),
//   HtmlLocation: sequelize.import('./Annotations/HTMLLocations'),
//   Thread: sequelize.import('./Annotations/Threads'),
//   Annotation: sequelize.import('./Annotations/Annotations'),
//
//   TagType: sequelize.import('./AnnotationActions/TagTypes'),
//   Tag: sequelize.import('./AnnotationActions/Tags'),
//
//   FileSystemObject: sequelize.import('./FileSystem/FileSystemObjects'),
//
//   GradingSystem: sequelize.import('./Grading/GradingSystems'),
//   GradingThreshold: sequelize.import('./Grading/GradingThresholds'),
//   CriteriaCount: sequelize.import('./Grading/CriteriaCounts'),
//   Criteria: sequelize.import('./Grading/Criteria'),
// };

// Object.keys(models).forEach(function (modelName) {
//   if ('classMethods' in models[modelName].options) {
//    if ('associate' in models[modelName].options.classMethods) {
//     models[modelName].options.classMethods.associate(models);
//     }
//   }
// });

if (!global.hasOwnProperty('db')) {
  var sequelize = null

  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true, //false
      define: {
        underscored: true
      }
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('new_nb_test', 'alisa', '', {
      host: 'localhost',
      dialect: 'postgres',
      port: 5432,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        underscored: true
      }
    })
  }

  const models = {
    User: sequelize.import('./Users'),
    Institution: sequelize.import('./Classes/Institutions'),
    Class: sequelize.import('./Classes/Classes'),
    Section: sequelize.import('./Classes/Sections'),
    PseudoUser: sequelize.import('./Classes/PseudoUsers'),

    Source: sequelize.import('./Annotations/Sources'),
    Location: sequelize.import('./Annotations/Locations'),
    HtmlLocation: sequelize.import('./Annotations/HTMLLocations'),
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

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
  }
  global.db = Object.assign(global.db, models);

  Object.keys(models).forEach(function (modelName) {
    if ('classMethods' in models[modelName].options) {
      if ('associate' in models[modelName].options.classMethods) {
        global.db[modelName].options.classMethods.associate(global.db);
      }
    }
  });

  // global.db.TagType.bulkCreate(
  //   [{
  //     value: "curious",
  //     emoji: "1F914"
  //   },
  //   {
  //     value: "confused",
  //     emoji: "1F616"
  //   },
  //   {
  //     value: "useful",
  //     emoji: "1F600"
  //   },
  //   {
  //     value: "interested",
  //     emoji: "1F9D0"
  //   },
  //   {
  //     value: "frustrated",
  //     emoji: "1F621"
  //   },
  //   {
  //     value: "help",
  //     emoji: "1F61F"
  //   },
  //   {
  //     value: "question",
  //     emoji: "2753"
  //   },
  //   {
  //     value: "idea",
  //     emoji: "1F4A1"
  //   }
  // ])
}

sequelize.sync();
// sequelize.drop({}).then(() =>{
// sequelize.sync()
//   .then(() => {
//     models.User.create(
//       {
//         username: "adrian",
//         email: "adriansy@mit.edu",
//         first_name: "Adrian",
//         last_name: "Sy",
//         password: "t"
//       }
//     ).then(user_1 => {
//       models.User.create(
//         {
//           username: "alisa",
//           email: "alisao@mit.edu",
//           first_name: "Alisa",
//           last_name: "Ono",
//           password: "t"
//         }
//       ).then((user_2) =>
//         utils(sequelize.models).createClass("Test Class", user_2.id)

//       ).then(nb_class =>
//         utils(sequelize.models).addStudent(nb_class.id, user_1.id)
//         .then(() => {
//           nb_class.getRoot().then((root) => utils(sequelize.models)
//           .createFile(root.id,
//             "test_link",
//             "file:///Users/adriansy/Dropbox%20(MIT)/MIT%20Sem%208/SuperUROP/nbdemo/index.html"));
//         })
//         .then(() => {
//           nb_class.getRoot().then((root) => utils(sequelize.models)
//           .createFile(root.id,
//             "libre_text test",
//             "file:///Users/adriansy/Dropbox%20(MIT)/MIT%20Sem%208/SuperUROP/W2017_Lecture_01_Reading%20-%20Biology%20LibreTexts.htm"));
//         })
//         .then(() => {
//           models.TagType.bulkCreate(
//             [{
//               value: "curious",
//               emoji: "1F914"
//             },
//             {
//               value: "confused",
//               emoji: "1F616"
//             },
//             {
//               value: "useful",
//               emoji: "1F600"
//             },
//             {
//               value: "interested",
//               emoji: "1F9D0"
//             },
//             {
//               value: "frustrated",
//               emoji: "1F621"
//             },
//             {
//               value: "help",
//               emoji: "1F61F"
//             },
//             {
//               value: "question",
//               emoji: "2753"
//             },
//             {
//               value: "idea",
//               emoji: "1F4A1"
//             }
//           ]).then((tag_types) => nb_class.setTagTypes(tag_types));
//         })
//       );
//     });


//   })
//   .catch(error => console.log('This error occured', error));
// });

// module.exports = sequelize.models;
module.exports = global.db;
