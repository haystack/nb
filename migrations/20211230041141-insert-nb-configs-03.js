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
                description: 'Configurations for new thread (sync) spotlight {type: "TYPE", color: "#FFFFFF", background: "#000000", showTime: true/false}'
            },
            {
                name: 'NB_LOG',
                value: 'false',
                description: 'Enable/Disable logging for NB'
            },
            {
                name: 'CONFIG_NB_LOG_SCROLL',
                value: '2000',
                description: 'Configurations for scroll log timer (ms)'
            },
            {
                name: 'SHOW_QUICK_EDITOR',
                value: 'false',
                description: 'Enable/Disable quick comment editor'
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
    }
};
