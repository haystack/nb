module.exports = function(models){
  const User = models.user;
  const Class = models.class;
  const Section = models.section;
  const FileSystemObject = models.file_system_object;
  const Source = models.source;

  return {
    createClass: function (name, userId){
      return Class.create({
        class_name: name
      })
      .then((nb_class) => 
        Section.create({section_name: 'global', is_global: true})
          .then((section) => nb_class.setGlobalSection(section)
          .then((updated_nb_class) =>{
            return section.setClass(updated_nb_class);
        }))
        .then(() => User.findByPk(userId).then((user) => 
          Promise.all([
            nb_class.setCreator(user),
            nb_class.setInstructors(user),
          ])
        )
        .then(() => FileSystemObject.create({filename: name, is_directory: true})
          .then((dir) => dir.setClass(nb_class)))
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

