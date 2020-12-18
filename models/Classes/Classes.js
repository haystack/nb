const nb_class = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    class_name:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    /*
    description: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    term: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    contact_email: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    institution: {
      type: DataTypes.STRING,
      defaultValue: ""
    },*/

    is_archived:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
    
  },
  {
    classMethods:{
      associate: (models) =>{
        Class.belongsTo(models.Institution, {as: 'Institution', foreignKey: 'institution'});
        Class.belongsTo(models.User, {as: 'Creator', foreignKey: 'creator'});
        Class.belongsToMany(models.User, {as: 'Instructors', through: 'instructors'});
        Class.belongsToMany(models.User, {as: 'ClassTAs', through: 'class_tas'});
        Class.hasMany(models.Section, {as: 'Sections', foreignKey: {name: 'class_id'}, onDelete: 'CASCADE'});
        Class.belongsTo(models.Section, {as: 'GlobalSection', foreignKey: {name: 'global_section_id'}, constraints: false});
        Class.hasOne(models.FileSystemObject, {as: 'Root', foreignKey: {name: 'class_id'}, onDelete: 'CASCADE'}); 
        Class.hasMany(models.GradingSystem, {as: 'GradingSystems', foreignKey: {name: 'class_id'}, onDelete: 'CASCADE'});
        Class.belongsToMany(models.TagType, {as: 'TagTypes', through: 'class_tags'});
        Class.hasMany(models.Source, {as: 'Sources', foreignKey:{ name: 'class_id', allowNull: false}, onDelete:'CASCADE'});
      }
    }
  });
  return Class;
};

module.exports = nb_class;