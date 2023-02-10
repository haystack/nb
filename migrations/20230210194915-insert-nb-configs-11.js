'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('nb_configs', [
            {
                name: 'SHOW_INDICATOR_FOR_TA_COMMENT',
                value: 'true',
                description: 'Enable/Disable indicator for TA comment in the list (sidebar)'
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
    }
};

