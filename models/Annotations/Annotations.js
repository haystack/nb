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
      values: ['public', 'private', 'author-only']
    },
    anonymity:{
      type: DataTypes.ENUM,
      values: ['anonymous', 'public']
    }
  },
  {
    classMethods:{
      associate: (models) => {
        Annotation.belongsTo(models.Thread, {as: 'Thread', foreignKey:{allowNull: false}, onDelete:'CASCADE'});
        Annotation.hasOne(models.Annotation, {as: 'Parent', onDelete: 'CASCADE'});
        Annotation.belongsTo(models.User, {as: 'Author', foreignKey:{name: 'author_id', allowNull: false}, onDelete:'CASCADE'});
        Annotation.hasMany(models.Tag, {as:'Tags', foreignKey:{allowNull: false}, onDelete: 'CASCADE'});
        Annotation.belongsToMany(models.User, {as:'ReplyRequesters', through:'reply_requests' , onDelete: 'CASCADE'});
        Annotation.belongsToMany(models.User, {as:'TaggedUsers', through:'user_tags' , onDelete: 'CASCADE'});
        Annotation.belongsToMany(models.User, {as:'Bookmarkers', through:'bookmarks' , onDelete: 'CASCADE'});
        Annotation.belongsToMany(models.User, {as:'Starrers', through:'stars' , onDelete: 'CASCADE'});
      }
    }
  });
  return Annotation;
};

module.exports = annotation;