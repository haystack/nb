const bcrypt = require('bcrypt');

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
  },
  {
    hooks:{
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  }
  );
  User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  };
  return User;
};

module.exports = user;