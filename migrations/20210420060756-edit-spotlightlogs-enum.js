'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query("ALTER TYPE enum_spotlight_logs_type ADD VALUE 'NOTIFICATION_HIGHLIGHT'")
        await queryInterface.sequelize.query("ALTER TYPE enum_spotlight_logs_type ADD VALUE 'NOTIFICATION_LIST'")
        await queryInterface.sequelize.query("ALTER TYPE enum_spotlight_logs_type ADD VALUE 'NOTIFICATION_POPUP'")
    }

};