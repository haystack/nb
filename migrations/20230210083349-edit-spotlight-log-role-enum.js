'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query("ALTER TYPE enum_spotlight_logs_role ADD VALUE 'TA'")
    },

    down: async (queryInterface, Sequelize) => {
      }
    
};
