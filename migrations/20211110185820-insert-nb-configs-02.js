'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.bulkInsert('nb_configs',[
            {
                name: 'SYNC_NOTIFICATION_AUDIO',
                value: 'false',
                description: 'Enable/Disable Sync notificaiton audio'
            },
            {
                name: 'SYNC_NOTIFICATION_POPUP',
                value: 'false',
                description: 'Enable/Disable Sync notificaiton popup'
            }
        ])
    },
    
    down: async (queryInterface, Sequelize) => {
    }
};
