'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_spotlight_header_type ADD VALUE 'TA_ENDORSED'")
    },

    down: async (queryInterface, Sequelize) => {
      }
    
};
