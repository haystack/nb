const nbConfig = (sequelize, DataTypes) => {
    const NbConfig = sequelize.define('nb_config', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: true
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    return NbConfig;
};

module.exports = nbConfig;