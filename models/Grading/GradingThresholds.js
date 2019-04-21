const gradingThreshold = (sequelize, DataTypes) => {
  const GradingThreshold = sequelize.define('grading_threshold', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    score:{
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        GradingThreshold.belongsTo(models.GradingSystem, {as: 'GradingSystem', foreignKey: {name: 'grading_system_id'}, onDelete: 'CASCADE'});
        GradingThreshold.hasMany(models.CriteriaCount, {as: 'GradingThreshold', foreignKey: {name: 'grading_threshold_id'}, onDelete: 'CASCADE'});
      }
    }
  });
  return GradingThreshold;
};

module.exports = gradingThreshold;