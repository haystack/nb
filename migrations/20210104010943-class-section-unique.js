'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('sections', {
            fields: ['section_name', 'class_id'],
            type: 'unique',
            name: 'section_name_classid_key'
        });
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint('sections', 'section_name_classid_key')
        ])
    }
};
