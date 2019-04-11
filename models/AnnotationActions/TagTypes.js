const tagTypes = (sequelize, DataTypes) => {
  const TagTypes = sequelize.define('tagTypes', {
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
  });
  return TagTypes;
};

module.exports = tagTypes;