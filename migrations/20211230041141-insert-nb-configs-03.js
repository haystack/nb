'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.bulkInsert('nb_configs', [
            {
                name: 'SYNC_SPOTLIGHT_NEW_THREAD',
                value: 'false',
                description: 'Enable/Disable spotlight new thread (sync)'
            },
            {
                name: 'CONFIG_SYNC_SPOTLIGHT_NEW_THREAD',
                value: '{"type":"RIGHT","color":"#334455"}',
                description: 'Configurations for new thread (sync) spotlight'
            },
            {
                name: 'SYNC_LOG',
                value: 'false',
                description: 'Enable/Disable logging for sync events'
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
    }
};
