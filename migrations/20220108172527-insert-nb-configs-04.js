'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.bulkInsert('nb_configs', [
            {
                name: 'FILTER_MAX_THREADS',
                value: 'false',
                description: 'Enable/Disable filtering max number of threads displayed'
            },
            {
                name: 'CONFIG_FILTER_MAX_THREADS',
                value: '20',
                description: 'Configurations for max number of threads displayed'
            },
            {
                name: 'SHOW_SPOTLIGHT_CONTROLS',
                value: 'true',
                description: 'Enable/Disable spotlight controls for instructors'
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
    }
};
