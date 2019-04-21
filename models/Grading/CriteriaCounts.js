const criteriaCount = (sequelize, DataTypes) => {
  const CriteriaCount = sequelize.define('criteria_count', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    num_annotations:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        CriteriaCount.belongsTo(models.GradingThreshold, {as: 'GradingThreshold', foreignKey: {name: 'grading_threshold_id'}, onDelete: 'CASCADE'});
        CriteriaCount.hasMany(models.Criteria, {as: 'Criteria', foreignKey: {name: 'criteria_count_id'}, onDelete: 'CASCADE'});
      }
    }
  });
  return CriteriaCount;
};

module.exports = criteriaCount;