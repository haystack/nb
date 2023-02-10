'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('email_types', [
            {
                id: 'SYSTEM',
                name: 'SYSTEM',
                description: null,
                is_user_managed: false
            },
             {
                id: 'TIPSANDTRICKS',
                name: 'Tips & Tricks',
                description: 'Tips & Tricks emails about NB features.',
                is_user_managed: true
            },
        ])
        
    },

    down: async (queryInterface, Sequelize) => {
    }
};

