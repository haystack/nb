const tagTypes = (sequelize, DataTypes) => {
  const TagType = sequelize.define('tag_type', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    value:{
      type: DataTypes.STRING,
      allowNull: false
    },
    emoji:{
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    classMethods:{
      associate: (models) => {
        TagType.belongsToMany(models.Class, {as: 'Classes', through: 'class_tags'});
        TagType.hasMany(models.Tag, {as:'Tags', foreignKey:{name: 'tag_type_id', allowNull: false}, onDelete: 'CASCADE'});
      }
    }
  });
  return TagType;
};

module.exports = tagTypes;