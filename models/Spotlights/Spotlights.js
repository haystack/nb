const spotlight = (sequelize, DataTypes) => {
    const Spotlight = sequelize.define('spotlight', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['NONE', 'IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN']
        }
    },
    {
        classMethods:{
            associate: (models) => {
                Spotlight.belongsTo(models.Annotation, {as: 'Annotation', foreignKey:{name: 'annotation_id'}, onDelete: 'CASCADE'});
            }
        }
    });
    return Spotlight;
};

module.exports = spotlight;