const annotationMedia = (sequelize, DataTypes) => {
    const AnnotationMedia = sequelize.define('annotation_media', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['audio', 'video']
        },
        filepath: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    },
        {
            classMethods: {
                associate: (models) => {
                    AnnotationMedia.belongsTo(models.Annotation, { as: 'Annotation', foreignKey: { name: 'annotation_id' }, onDelete: 'CASCADE' });
                }
            }
        }
    );
    return AnnotationMedia;
};

module.exports = annotationMedia;