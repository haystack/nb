'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('nb_configs', [
            {
                name: 'SHOW_INDICATOR_FOR_TIME',
                value: 'false',
                description: 'Enable/Disable indicator for time in the list (sidebar)'
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
    }
};

