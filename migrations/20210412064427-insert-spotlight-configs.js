'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.bulkInsert('nb_configs', [{
            name: 'SPOTLIGHT_INNOTATION',
            value: 'false',
            description: 'Enable/Disable spotlight (INNOTATION)'
        }, {
            name: 'SPOTLIGHT_EM',
            value: 'false',
            description: 'Enable/Disable spotlight (EM)'
        }, {
            name: 'SPOTLIGHT_MARGIN',
            value: 'false',
            description: 'Enable/Disable spotlight (MARGIN)'
        }, ]);
    },
    
    down: async (queryInterface, Sequelize) => {

    }
};
