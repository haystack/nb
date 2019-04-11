const annotation = (sequelize, DataTypes) => {
  const Annotation = sequelize.define('annotation', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    content:{
      type: DataTypes.STRING,
      allowNull: false
    },
    is_section_marker:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    visibility:{
      type: DataTypes.ENUM,
      values: ['anonymous', 'public', 'private', 'author-only']
    }
  });
  return Annotation;
};

module.exports = annotation;