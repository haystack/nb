const institution = (sequelize, DataTypes) => {
  const Institution = sequelize.define('institution', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    institution_name:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });
  return Institution;
};

module.exports = institution