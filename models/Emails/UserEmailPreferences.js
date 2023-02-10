const userEmailPreference = (sequelize, DataTypes) => {
    const UserEmailPreference = sequelize.define('user_email_preference', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['ENABLE', 'DISABLE']
        },
    },

    {
        classMethods:{
            associate: (models) => {
                UserEmailPreference.belongsTo(models.EmailType, {as: 'EmailType', foreignKey:{name: 'email_type_id'}, onDelete: 'CASCADE'});
                UserEmailPreference.belongsTo(models.User, {as: 'User', foreignKey:{name: 'user_id'}, onDelete: 'CASCADE'});
            }
        },

        indexes: [
            {
                unique: true,
                fields: ['email_type_id', 'user_id']
            }
        ],

    });
    return UserEmailPreference;
};

module.exports = userEmailPreference;