const source = (sequelize, DataTypes) => {
  const Source = sequelize.define('source', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    filepath:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    filename:{
      type: DataTypes.STRING,
      allowNull: false
    },
    filetype:{
      type: DataTypes.ENUM,
      values: ['html', 'pdf', 'image', 'video']
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        Source.hasMany(models.Location, {as: 'Locations', foreignKey: {name: 'source_id', allowNull: false}, onDelete: 'CASCADE'});
      }
    }
  });
  return Source;
};

module.exports = source;