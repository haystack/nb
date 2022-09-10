'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('spotlight_logs', 'trigger', {
                type: Sequelize.ENUM,
                values: ['NONE', 'INSTRUCTOR_COMMENTED', 'REPLY_REQUESTED', 'USER_TAGGED', 'USER_SAW_RECENT_ACTIVITY']
            });
        } catch(err) {}
    },
    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('spotlight_logs', 'trigger');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_spotlight_logs_trigger";');
    }
};
