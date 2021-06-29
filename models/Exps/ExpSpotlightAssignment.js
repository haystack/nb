const expSpotlighAssignment = (sequelize, DataTypes) => {
    const ExpSpotlighAssignment = sequelize.define('exp_spotligh_assignment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['NONE', 'IN', 'BLOCK', 'EM']
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0.
        },
        annotations: {
            type: DataTypes.TEXT,
        },
    },
        {
            classMethods: {
                associate: (models) => {
                    ExpSpotlighAssignment.belongsTo(models.Class, { as: 'Class', foreignKey: { name: 'class_id' }, onDelete: 'CASCADE' });
                    ExpSpotlighAssignment.belongsTo(models.Source, { as: 'Source', foreignKey: { name: 'source_id' }, onDelete: 'CASCADE' });
                    ExpSpotlighAssignment.belongsTo(models.User, { as: 'User', foreignKey: { name: 'user_id' }, onDelete: 'CASCADE' });
                }
            }
        });
    return ExpSpotlighAssignment;
};

module.exports = expSpotlighAssignment;