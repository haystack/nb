const assignment = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('assignment', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    deadline:{
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        Assignment.belongsTo(models.Source, {as:'Assignment', foreignKey:{name: 'source_id', allowNull: false}, onDelete: 'CASCADE'});
      }
    }
  });
  return Assignment;
};

module.exports = assignment;