const spotlightLog = (sequelize, DataTypes) => {
    const SpotlightLog = sequelize.define('spotlight_log', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        action: {
            type: DataTypes.ENUM,
            values: ['CLICK']
        },
        position: {
            type: DataTypes.ENUM,
            values: ['IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN']
        },
        role: {
            type: DataTypes.ENUM,
            values: ['INSTRUCTOR', 'STUDENT']
        }
    },
    {
        classMethods:{
            associate: (models) => {
                SpotlightLog.belongsTo(models.Annotation, {as: 'Annotation', foreignKey:{name: 'annotation_id'}});
                SpotlightLog.belongsTo(models.User, {as: 'User', foreignKey:{name: 'user_id'}});
            }
        }
    });
    return SpotlightLog;
};

module.exports = spotlightLog;