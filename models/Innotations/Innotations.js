const innotation = (sequelize, DataTypes) => {
    const Innotation = sequelize.define('annotation', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        position: {
            type: DataTypes.ENUM,
            values: ['IN', 'UP', 'DOWN', 'LEFT', 'RIGHT']
        }
    },
    {
        classMethods:{
            associate: (models) => {
                Innotation.belongsTo(models.Annotation, {as: 'Annotation', foreignKey:{name: 'annotation_id'}, onDelete: 'CASCADE'});                
            }
        }
    });
    return Innotation;
};

module.exports = innotation;