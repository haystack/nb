const tags = (sequelize, DataTypes) => {
  const Tags = sequelize.define('tags', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
  });
  return Tags;
};

module.exports = tags;