const tagTypes = (sequelize, DataTypes) => {
  const TagType = sequelize.define('tag_type', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    tag_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    icon:{
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    classMethods:{
      associate: (models) => {
        TagType.hasMany(models.Tag, {as:'Tags', foreignKey:{allowNull: false}, onDelete: 'CASCADE'});
      }
    }
  });
  return TagType;
};

module.exports = tagTypes;