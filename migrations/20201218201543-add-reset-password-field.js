'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'reset_password_id',
        {
          type: Sequelize.UUID,
          unique: true,
          allowNull: true,
        }
      )
    ]);

  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'reset_password_id')
    ])
  }
};