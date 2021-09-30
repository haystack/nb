const consent = (sequelize, DataTypes) => {
    const Consent = sequelize.define('consent', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
        {
            classMethods: {
                associate: (models) => {
                    Consent.belongsToMany(models.User, { as: 'Consentees', through: 'consentees', onDelete: 'CASCADE' });
                    Consent.belongsToMany(models.User, { as: 'Dissenters', through: 'dissenters', onDelete: 'CASCADE' });
                }
            }
        });
    return Consent;
};

module.exports = consent;