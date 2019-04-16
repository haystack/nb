const section = (sequelize, DataTypes) => {
  const Section = sequelize.define('section', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    section_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    is_global:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        Section.belongsTo(models.Class, {as: 'Class', foreignKey: {name: 'class_id'}, onDelete: 'CASCADE'});
        Section.belongsToMany(models.User, {as: 'SectionTAs', through: 'section_tas'});
        Section.belongsToMany(models.User, {as: 'MemberStudents', through: 'student'});
        Section.belongsToMany(models.User, {as: 'InvitedStudents', through: 'invited_students'});
      }
    }
  });
  return Section;
};

module.exports = section;