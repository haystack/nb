const location = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    type:{
      type: DataTypes.ENUM,
      values: ['html', 'pdf', 'image', 'video'],
      defaultValue: 'html'
    }
  },
  {
    classMethods:{
      associate: (models) => {
        Location.belongsTo(models.Source, {as: 'Source', foreignKey: {name: 'source_id', allowNull: false}, onDelete: 'CASCADE'});
        Location.hasOne(models.Thread, {as: 'Thread', foreignKey:{name: 'location_id', allowNull: false}});
        Location.hasOne(models.HtmlLocation, {as: 'HtmlLocation', foreignKey: {name: 'location_id'}, onDelete: 'CASCADE'});
      }
    }
  });
  return Location;
};

module.exports = location;