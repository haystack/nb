const tags = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
  },
  {
    classMethods:{
      associate: (models) => {
        Tag.belongsTo(models.TagType, {as:'TagType', foreignKey:{allowNull: false}, onDelete: 'CASCADE'});
      }
    }
  });
  return Tag;
};

module.exports = tags;