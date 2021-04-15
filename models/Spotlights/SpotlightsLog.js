const spotlightLog = (sequelize, DataTypes) => {
    const SpotlightLog = sequelize.define('spotlight_log', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        action: {
            type: DataTypes.ENUM,
            values: ['CLICK', 'HOVER', 'STAR', 'REPLY_REQUEST', 'BOOKMARK', 'REPLY', 'SESSION_START', 'SESSION_END']
        },
        type: {
            type: DataTypes.ENUM,
            values: ['NONE', 'IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN', 'LIST', 'HIGHLIGHT']
        },
        role: {
            type: DataTypes.ENUM,
            values: ['INSTRUCTOR', 'STUDENT']
        },
    },
    {
        classMethods:{
            associate: (models) => {
                SpotlightLog.belongsTo(models.Spotlight, {as: 'Spotlight', foreignKey:{name: 'spotlight_id'}});
                SpotlightLog.belongsTo(models.Annotation, {as: 'Annotation', foreignKey:{name: 'annotation_id'}, onDelete: 'CASCADE'});
                SpotlightLog.belongsTo(models.User, {as: 'User', foreignKey:{name: 'user_id'}, onDelete: 'CASCADE'});
                SpotlightLog.belongsTo(models.Class, {as: 'Class', foreignKey:{name: 'class_id'}, onDelete: 'CASCADE'});
                SpotlightLog.belongsTo(models.Source, {as: 'Source', foreignKey: {name: 'source_id'}, onDelete: 'CASCADE'});
            }
        }
    });
    return SpotlightLog;
};

module.exports = spotlightLog;