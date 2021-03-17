'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('innotations', 'annotation_id', {
            type: Sequelize.UUID,
            references: {
                model: 'annotations',
                key: 'id',
            },
            onDelete: 'CASCADE',
        });
    },
    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('innotations', 'annotation_id');
    }
};
