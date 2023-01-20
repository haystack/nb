const emailTypes = (sequelize, DataTypes) => {
    const EmailTypes = sequelize.define('email_types', {
        id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_user_managed:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    );
    return EmailTypes;
};

module.exports = emailTypes;