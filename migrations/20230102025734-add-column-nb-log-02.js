'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('nb_logs', 'head_annotation_id', {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'annotations',
                key: 'id',
            },
        });    
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('nb_logs', 'head_annotation_id');
      }
    
};
