const gradingSystem = (sequelize, DataTypes) => {
  const GradingSystem = sequelize.define('grading_system', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    grading_system_name:{
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        GradingSystem.belongsTo(models.Class, {as: 'Class', foreignKey: {name: 'class_id'}, onDelete: 'CASCADE'});
        GradingSystem.hasMany(models.GradingThreshold, {as: 'GradingThresholds', foreignKey: {name: 'grading_system_id'}, onDelete: 'CASCADE'});
      }
    }
  });
  return GradingSystem;
};

module.exports = gradingSystem;