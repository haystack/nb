const criteria = (sequelize, DataTypes) => {
  const Criteria = sequelize.define('criteria', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    criteria_name:{
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
    }
  },
  {
    classMethods:{
      associate: (models) =>{
        Criteria.belongsTo(models.CriteriaCount, {as: 'CriteriaCount', foreignKey: {name: 'criteria_count_id'}, onDelete: 'CASCADE'});
      }
    }
  });
  return Criteria;
};

module.exports = criteria;