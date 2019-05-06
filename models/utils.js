module.exports = function(models){
  const User = models.User;
  const Class = models.Class;
  const Section = models.Section;
  const FileSystemObject = models.FileSystemObject;
  const GradingSystems = models.GradingSystem;
  const Source = models.Source;

  return {
    createClass: function (name, userId){
      return Class.create({
        class_name: name
      })
      //create the global section
      .then((nb_class) =>
        Section.create({section_name: 'global', is_global: true, class_id: nb_class.id})
        .then((section) => nb_class.setGlobalSection(section))
        .then(() => User.findByPk(userId).then((user) =>
          Promise.all([
            nb_class.setCreator(user),
            nb_class.setInstructors(user),
          ])
        )
        .then(() => FileSystemObject.create({filename: name, is_directory: true})
          .then((dir) => dir.setClass(nb_class)))
        )
        .then(() =>
          GradingSystems.create({
            grading_system_name: "default",
            class_id: nb_class.id,
            GradingThresholds: [
              {
                label: "Very good",
                score: 4.0,
                total_comments: 3,
                total_words: 60
              },
              {
                label: "Good",
                score: 3.0,
                total_comments: 2,
                total_words: 40
              },
              {
                label: "Fair",
                score: 2.0,
                total_comments: 1,
                total_words: 15
              },
            ],
            Criteria: [
              {
                label: "Good comment",
                num_words: 20,
              }
            ]
          }, {include: [{association: 'GradingThresholds'}, {association: 'Criteria'}]})

        )
      .then(() => nb_class));
    },

    addStudent: function(classId, userId){
      return Class.findByPk(classId, {include:[{association: 'GlobalSection'}]})
      .then((nb_class) =>
        User.findByPk(userId).then((user) =>
          nb_class.GlobalSection.addMemberStudent(user)
        )
      );
    },

    createFile: function(parentId, filename, filepath){
      return FileSystemObject.findByPk(parentId, {include:[{association: 'Class'}]})
      .then((folder) =>
        FileSystemObject.create({
          filename: filename,
          is_directory: false,
          parent_id: folder.id,
          Source:{filepath: filepath, filename: filename, class_id: folder.Class.id}
        },
          {include: {model: Source, as: 'Source'}
        })
          // .then((child) =>
          //   Promise.all([
          //     child.setParent(folder),
          //   ])
          // )
      );
    }
  };
};
