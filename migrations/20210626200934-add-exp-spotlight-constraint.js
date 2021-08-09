'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('exp_spotligh_assignments', {
            fields: ['class_id', 'source_id', 'user_id'],
            type: 'unique',
            name: 'class_source_user_key'
        });
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.removeConstraint('exp_spotligh_assignments', 'class_source_user_key')
    }
};
