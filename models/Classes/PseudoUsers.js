const pseudouser = (sequelize, DataTypes) => {
  const PseudoUser = sequelize.define('pseudo_user', {
    token:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
  },
  {
    classMethods:{
      associate: (models) => {
        PseudoUser.belongsTo(models.User, {as: 'User'});
        PseudoUser.belongsTo(models.Class, {as: 'Class'});
      }
    }
  }
  );
  return PseudoUser;
};

module.exports = pseudouser;