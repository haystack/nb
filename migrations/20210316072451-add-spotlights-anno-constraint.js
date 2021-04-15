'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('spotlights', { 
            fields: ['annotation_id'],
            type: 'unique',
            name: 'annotation_id_key'
        });
        
    },
    
    down: async (queryInterface, Sequelize) => {
        queryInterface.removeConstraint('spotlights', 'annotation_id_key')
    }
};
