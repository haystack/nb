const nb_class = require("./Classes/Classes");

module.exports = function (models) {
  const User = models.User;
  const Class = models.Class;
  const Section = models.Section;
  const FileSystemObject = models.FileSystemObject;
  const GradingSystems = models.GradingSystem;
  const Source = models.Source;

  return {
    editClass: function (id, newData, sections) {
      return Class.findByPk(id).then((course) => {
        if (newData) {
          course.update({
            class_name: newData.class_name,
            /*description: newData.description,
            term: newData.term,
            contact_email: newData.contact_email,
            institution: newData.institution*/
          })
            .then(() => {
              console.log("Updated title to " + newData.class_name);
            })
        };

        // adding new sections (not currently being used on frontend)
        let sectionsList = sections.replace(/\s/g, '').split(",")
        sectionsList.forEach((sectionName) => {
          if (sectionName !== "") {
            Section.findOne({ where: { section_name: sectionName } }).then((sectionFound) => { // ensure uniqueness
              if (sectionFound) {
                console.log("section " + sectionName + " already exists")
              } else {
                Section.create({ section_name: sectionName, is_global: false, class_id: newData.id })
                  .then((section) => nb_class.addSection(section))
              }
            });
          }
        })


        //if(newData.description)
      })
    },
    createClass: function (name, userId) {
      return Class.create({
        class_name: name
      })
        //create the global section
        .then((nb_class) =>
          Section.create({ section_name: 'global', is_global: true, class_id: nb_class.id })
            .then((section) => nb_class.setGlobalSection(section))
            .then(() => User.findByPk(userId).then((user) =>
              Promise.all([
                nb_class.setCreator(user),
                nb_class.setInstructors(user),
                // nb_class.update({contact_email: user.email}) (This field does not exist yet in Class)
              ])
            )
              .then(() => FileSystemObject.create({ filename: name, is_directory: true })
                .then((dir) => dir.setClass(nb_class)))
            )
            .then(() => {
              const tagDefaults = [
                { value: "lightbulb-moment", emoji: "11_lightbulb-moment" },
                { value: "learning-goal", emoji: "9_learning-goal" },
                { value: "just-curious", emoji: "3_just-curious" },
                { value: "lost", emoji: "4_lost" },
                { value: "interesting-topic", emoji: "1_interesting-topic" },
                { value: "question", emoji: "7_question" },
                { value: "i-think", emoji: "6_i-think" },
                { value: "surprised", emoji: "2_surprised" },
                { value: "lets-discuss", emoji: "5_lets-discuss" },
                { value: "important", emoji: "8_important" },
                { value: "real-world-application", emoji: "10_real-world-application" },
                { value: "needs-work", emoji: "12_needs-work" }
              ];

              Promise.all(tagDefaults.map(tagDefault =>
                models.TagType.findOrCreate({ where: tagDefault }).then(res => res[0])
              )).then(tag_types => nb_class.setTagTypes(tag_types));
            })
            .then(() =>
              GradingSystems.create({
                grading_system_name: "default",
                class_id: nb_class.id,
                GradingThresholds: [
                  { label: "Very good", score: 4.0, total_comments: 3, total_words: 60 },
                  { label: "Good", score: 3.0, total_comments: 2, total_words: 40 },
                  { label: "Fair", score: 2.0, total_comments: 1, total_words: 15 },
                ],
                Criteria: [
                  { label: "Good comment", num_words: 20, }
                ]
              }, { include: [{ association: 'GradingThresholds' }, { association: 'Criteria' }] })

            )
            .then(() => nb_class));
    },

    addStudentToSection: function (nb_class, user, sectionName) {
      // add to global section (if not there yet?)
      nb_class.GlobalSection.addMemberStudent(user);
      // }

      // remove student from existing non-global section, and then add to new section
      Section.findOne({
        where: { class_id: nb_class.id, is_global: false },
        include: [{
          model: models.User,
          as: 'MemberStudents',
          where: { id: user.id }, // filter to find a section with this student
        }]
      })
        .then(function (section) {
          if (section) {
            section.removeMemberStudent(user);
          }
          if (sectionName.length > 0) { // if there is a valid section name
            Section.findOrCreate({
              where: { section_name: sectionName, class_id: nb_class.id },
              defaults: {
                is_global: false
              }
            })
              .then(([section, createdBool]) => {
                section.addMemberStudent(user)
              });
          }

        })
    },

    addStudent: function (classId, userId) {
      return Class.findByPk(classId, { include: [{ association: 'GlobalSection' }] })
        .then((nb_class) =>
          User.findByPk(userId).then((user) =>
            nb_class.GlobalSection.addMemberStudent(user)
          )
        );
    },

    removeStudent: function (classId, userId) {
      return Class.findByPk(classId, { include: [{ association: 'GlobalSection' }] })
        .then((nb_class) =>
          User.findByPk(userId).then((user) =>
            nb_class.GlobalSection.removeMemberStudent(user)
          )
        );
    },
    createAnnotation: function (location, head, instructors, sessionUserId) {
      let annotation = {}
      let range = location.HtmlLocation;

      try {
        annotation.id = head.id;
        annotation.range = {
          start: range.start_node,
          end: range.end_node,
          startOffset: range.start_offset,
          endOffset: range.end_offset
        };
        annotation.parent = null;
        annotation.timestamp = head.dataValues.created_at;
        annotation.author = head.Author.id;
        annotation.authorName = head.Author.first_name + " " + head.Author.last_name;
        annotation.instructor = instructors.has(head.Author.id);
        annotation.html = head.content;
        annotation.hashtags = head.Tags.map(tag => tag.tag_type_id);
        annotation.people = head.TaggedUsers.map(userTag => userTag.id);
        annotation.visibility = head.visibility;
        annotation.anonymity = head.anonymity;
        annotation.spotlight = head.Spotlight
        annotation.media = head.Media
        annotation.replyRequestedByMe = head.ReplyRequesters.reduce((bool, user) => bool || user.id == sessionUserId, false);
        annotation.replyRequestCount = head.ReplyRequesters.length;
        annotation.starredByMe = head.Starrers.reduce((bool, user) => bool || user.id == sessionUserId, false);
        annotation.starCount = head.Starrers.length;
        annotation.seenByMe = location.Thread.SeenUsers.reduce((bool, user) => bool || user.id == sessionUserId, false);
        annotation.bookmarked = head.Bookmarkers.reduce((bool, user) => bool || user.id == sessionUserId, false);
      } catch (error) {
        console.error('\n\n\ncreateAnnotation Error')
        console.error(error)
        console.error(`annotation.id: ${annotation.id}`)
        console.error(`location.id: ${location.id}`)
      }

      return annotation
    },
    createAnnotationFromThread: function (htmlLocation, head, seenUsers, instructors, sessionUserId) {
      let annotation = {}
      let range = htmlLocation;

      try {
        annotation.id = head.id;
        annotation.range = {
          start: range.start_node,
          end: range.end_node,
          startOffset: range.start_offset,
          endOffset: range.end_offset
        };
        annotation.parent = null;
        annotation.timestamp = head.dataValues.created_at;
        annotation.author = head.Author.id;
        annotation.authorName = head.Author.first_name + " " + head.Author.last_name;
        annotation.instructor = instructors.has(head.Author.id);
        annotation.html = head.content;
        annotation.hashtags = head.Tags.map(tag => tag.tag_type_id);
        annotation.people = head.TaggedUsers.map(userTag => userTag.id);
        annotation.visibility = head.visibility;
        annotation.anonymity = head.anonymity;
        annotation.media = head.Media;
        annotation.replyRequestedByMe = head.ReplyRequesters
          .reduce((bool, user) => bool || user.id == sessionUserId, false);
        annotation.replyRequestCount = head.ReplyRequesters.length;
        annotation.starredByMe = head.Starrers
          .reduce((bool, user) => bool || user.id == sessionUserId, false);
        annotation.starCount = head.Starrers.length;
        annotation.seenByMe = seenUsers
          .reduce((bool, user) => bool || user.id == sessionUserId, false);
        annotation.bookmarked = head.Bookmarkers
          .reduce((bool, user) => bool || user.id == sessionUserId, false);
      } catch (error) {
        console.error('\n\n\ncreateAnnotationFromThread')
        console.error(error)
        console.error(`annotation.id: ${annotation.id}`)
        console.error(`location.id: ${location.id}`)
      }

      return annotation
    },
    createFile: function (parentId, filename, filepath) {
      return FileSystemObject.findByPk(parentId, { include: [{ association: 'Class' }] })
        .then((folder) => {
          return FileSystemObject.create({
            filename: filename,
            is_directory: false,
            parent_id: folder.id,
            Source: { filepath: filepath, filename: filename, class_id: folder.Class.id }
          },
            {
              include: { model: Source, as: 'Source' }
            }).then((newClass) => {
              return newClass
            }).catch(function (err) {
              return { error: true } // we should probably have better error handling (catch Sequelize.SequelizeForeignKeyConstraintError)
            });
        }
        );
    },


  };
};
