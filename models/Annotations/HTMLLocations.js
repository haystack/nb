const htmlLocation = (sequelize, DataTypes) => {
  const HtmlLocation = sequelize.define('html_location', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    start_node:{
      type: DataTypes.STRING,
      allowNull: false
    },
    end_node:{
      type: DataTypes.STRING,
      allowNull: false
    },
    start_offset:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end_offset:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    classMethods:{
      associate: (models) => {
        HtmlLocation.belongsTo(models.Location, {as: 'Location', foreignKey: {name: 'location_id', allowNull: false}, onDelete: 'CASCADE'});
      }
    }
  });
  return HtmlLocation;
};

module.exports = htmlLocation;