const thread = (sequelize, DataTypes) => {
  const Thread = sequelize.define('thread', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    is_global:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    is_section_marker:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        Thread.belongsTo(models.Location, {as: 'Location'});
        Thread.belongsTo(models.Annotation, {as: 'HeadAnnotation', foreignKey:{allowNull: false}, constraints: false,});
        
      }
    }
  });
  return Thread;
};

module.exports = thread;