const criteria = (sequelize, DataTypes) => {
  const Criteria = sequelize.define('criteria', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    label:{
      type: DataTypes.STRING,
      allowNull: false
    },
    num_words:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    num_tags:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    num_chars:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        Criteria.belongsTo(models.GradingSystem, {as: 'GradingSystem', foreignKey: {name: 'grading_system_id'}});
        Criteria.hasMany(models.CriteriaCount, {as: 'CriteriaCounts', foreignKey: {name: 'criteria_id'}, onDelete: 'CASCADE'});
      }
    }
  });
  return Criteria;
};

module.exports = criteria;