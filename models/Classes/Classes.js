const nb_class = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    class_name:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    is_archived:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  return Class;
};

module.exports = nb_class;