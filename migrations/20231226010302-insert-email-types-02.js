'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('email_types', [
             {
                id: 'NEWREPLY',
                name: 'New Reply',
                description: 'New reply on a thread you participated in',
                is_user_managed: true
            },
        ])
        
    },

    down: async (queryInterface, Sequelize) => {
    }
};

