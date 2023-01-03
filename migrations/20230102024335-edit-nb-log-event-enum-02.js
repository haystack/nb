'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event ADD VALUE 'FOLLOW'")
        await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event ADD VALUE 'UNFOLLOW'")
        await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event ADD VALUE 'SHOW_SPOTLIGHT'")
        await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event ADD VALUE 'HIDE_SPOTLIGHT'")
    },

    down: async (queryInterface, Sequelize) => {
      }
    
};
