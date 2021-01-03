'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'classes',
        'description',
        {
          type: Sequelize.STRING,
          defaultValue: ""
        }
      ),
      queryInterface.addColumn(
        'classes',
        'term',
        {
          type: Sequelize.STRING,
          defaultValue: ""
        }
      ),
      queryInterface.addColumn(
        'classes',
        'contact_email',
        {
          type: Sequelize.STRING,
          defaultValue: ""
        }
      )
      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
