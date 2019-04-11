const section = (sequelize, DataTypes) => {
  const Section = sequelize.define('section', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    section_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    is_global:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  return Section;
};

module.exports = section;