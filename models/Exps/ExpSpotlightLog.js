const spotlightLog = (sequelize, DataTypes) => {
    const SpotlightLog = sequelize.define('exp_spotligh_log', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        event: {
            type: DataTypes.ENUM,
            values: ['CLICK', 'HOVER', 'STAR', 'REPLY_REQUEST', 'BOOKMARK', 'REPLY', 'SESSION_START', 'SESSION_END', 'HIDE_HIGHLIGHT', 'SHOW_HIGHLIGHT', 'NEW_ANNOTATION']
        },
        initiator: {
            type: DataTypes.ENUM,
            values: ['NONE', 'SPOTLIGHT', 'LIST', 'HIGHLIGHT']
        },
        type: {
            type: DataTypes.ENUM,
            values: ['NONE', 'IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN']
        },
        order: {
            type: DataTypes.INTEGER,
        },
        high_quality: {
            type: DataTypes.BOOLEAN,
        },
        source_annotations_count: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0.
        },
        annotation_replies_count: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0.
        },
        exp_group: {
            type: DataTypes.ENUM,
            values: ['NONE', 'CONTROL', 'TREATMENT']
        },
        exp_type: {
            type: DataTypes.ENUM,
            values: ['NONE', 'IN', 'BLOCK', 'EM']
        },
        exp_quantity: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0.
        },
    },
        {
            classMethods: {
                associate: (models) => {
                    SpotlightLog.belongsTo(models.Annotation, { as: 'Annotation', foreignKey: { name: 'annotation_id' }, onDelete: 'CASCADE' });
                    SpotlightLog.belongsTo(models.User, { as: 'User', foreignKey: { name: 'user_id' }, onDelete: 'CASCADE' });
                    SpotlightLog.belongsTo(models.Class, { as: 'Class', foreignKey: { name: 'class_id' }, onDelete: 'CASCADE' });
                    SpotlightLog.belongsTo(models.Source, { as: 'Source', foreignKey: { name: 'source_id' }, onDelete: 'CASCADE' });
                }
            }
        });
    return SpotlightLog;
};

module.exports = spotlightLog;