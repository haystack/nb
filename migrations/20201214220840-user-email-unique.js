'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return Promise.all([
      queryInterface.addConstraint('users', {
        fields: ['email'],
        type: 'unique',
        name: 'custom_unique_constraint_name'
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {

  }
};
