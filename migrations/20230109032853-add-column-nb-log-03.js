'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('nb_logs', 'count_spotlights', {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
        await queryInterface.addColumn('nb_logs', 'spotlight_header_type', {
            type: Sequelize.ENUM,
            values: ['FOLLOW', 'QUESTION', 'ENDORSED', 'GENERAL'],
            allowNull: true,
        }); 
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('nb_logs', 'head_annotation_id');
        await queryInterface.removeColumn('nb_logs', 'spotlight_header_type');
    }
    
};
