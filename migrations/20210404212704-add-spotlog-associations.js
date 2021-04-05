'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('spotlight_logs', 'annotation_id', {
            type: Sequelize.UUID,
            references: {
                model: 'annotations',
                key: 'id',
            },
        });
        await queryInterface.addColumn('spotlight_logs', 'user_id', {
            type: Sequelize.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
        });
    },
    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('spotlight_logs', 'annotation_id');
        await queryInterface.removeColumn('spotlight_logs', 'user_id');
    }
};
