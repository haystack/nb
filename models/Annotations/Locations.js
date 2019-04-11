const location = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }
  });
  return Location;
};

module.exports = location;