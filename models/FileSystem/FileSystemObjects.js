const file_system_object = (sequelize, DataTypes) => {
  const FileSystemObject = sequelize.define('file_system_object', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    filename:{
      type: DataTypes.STRING,
      allowNull: false
    },
    is_directory:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        FileSystemObject.belongsTo(models.Class, {as: 'Class', foreignKey: {name: 'class_id'}, onDelete: 'CASCADE'});
        FileSystemObject.belongsTo(models.FileSystemObject, {as: 'Parent', foreignKey: {name: 'parent_id'}, onDelete: 'CASCADE'});
        FileSystemObject.hasMany(models.FileSystemObject, {as: 'Children', foreignKey: {name: 'parent_id'}, onDelete: 'CASCADE'});
        FileSystemObject.belongsTo(models.Source, {as: 'Source', foreignKey: {name: 'source_id'}});
      }
    }
  });
  return FileSystemObject;
};

module.exports = file_system_object;