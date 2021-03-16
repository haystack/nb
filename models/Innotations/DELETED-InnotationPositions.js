const innotationPosition = (sequelize, DataTypes) => {
    const InnotationPosition = sequelize.define('innotation_position', {
      id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      type:{
        type: DataTypes.ENUM,
        values: ['IN', 'UP', 'DOWN', 'LEFT', 'RIGHT']
      }
    },
    {
        classMethods: {
            associate: (models) => {

            }
        }
    }
    );
    return InnotationPosition;
  };
  
  module.exports = innotationPosition;