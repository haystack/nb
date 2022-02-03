const annotation = (sequelize, DataTypes) => {
  const Annotation = sequelize.define('annotation', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    content:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_section_marker:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    visibility:{
      type: DataTypes.ENUM,
      values: ['EVERYONE', 'INSTRUCTORS', 'MYSELF']
    },
    anonymity:{
      type: DataTypes.ENUM,
      values: ['IDENTIFIED', 'ANONYMOUS']
    },
    endorsed:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    classMethods:{
      associate: (models) => {
        Annotation.belongsTo(models.Thread, {as: 'Thread', foreignKey:{name: 'thread_id'}, onDelete:'CASCADE'});
        Annotation.belongsTo(models.Annotation, {as: 'Parent', foreignKey:{name: 'parent_id'}, onDelete: 'CASCADE'});
        Annotation.hasMany(models.Annotation, {as: 'Children', foreignKey:{name: 'parent_id'}});
        Annotation.belongsTo(models.User, {as: 'Author', foreignKey:{name: 'author_id', allowNull: false}, onDelete:'CASCADE'});
        Annotation.hasMany(models.Tag, {as:'Tags', foreignKey:{name: 'annotation_id', allowNull: false}, onDelete: 'CASCADE'});
        Annotation.belongsToMany(models.User, {as:'ReplyRequesters', through:'reply_requests' , onDelete: 'CASCADE'});
        Annotation.belongsToMany(models.User, {as:'TaggedUsers', through:'user_tags' , onDelete: 'CASCADE'});
        Annotation.belongsToMany(models.User, {as:'Bookmarkers', through:'bookmarks' , onDelete: 'CASCADE'});
        Annotation.belongsToMany(models.User, {as:'Starrers', through:'stars' , onDelete: 'CASCADE'});
        Annotation.hasOne(models.Spotlight, {as: 'Spotlight', foreignKey:{name: 'annotation_id'}, onDelete: 'CASCADE'});
      }
    }
  });
  return Annotation;
};

module.exports = annotation;