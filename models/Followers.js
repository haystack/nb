const followers = (sequelize, DataTypes) => {
    const Followers = sequelize.define('followers', {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        follower_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
    },
    {
        classMethods: {
            associate: (models) => {
                Followers.hasMany(models.User, { as: 'User', foreignKey: { name: 'id', allowNull: false }, onDelete: 'CASCADE' });
                Followers.hasMany(models.User, { as: 'Follower', foreignKey: { name: 'id', allowNull: false }, onDelete: 'CASCADE' });
            }
        },
    });
    return Followers;
};

module.exports = followers;