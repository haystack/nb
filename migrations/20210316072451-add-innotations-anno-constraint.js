'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addConstraint('innotations', { 
            fields: ['annotation_id'],
            type: 'unique',
            name: 'annotation_id_key'
        });
        
    },
    
    down: async (queryInterface, Sequelize) => {
        queryInterface.removeConstraint('innotations', 'annotation_id_key')
    }
};
