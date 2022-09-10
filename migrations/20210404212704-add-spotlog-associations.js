'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('spotlight_logs', 'spotlight_id', {
                type: Sequelize.UUID,
                references: {
                    model: 'spotlights',
                    key: 'id',
                },
            });
            await queryInterface.addColumn('spotlight_logs', 'annotation_id', {
                type: Sequelize.UUID,
                references: {
                    model: 'annotations',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            });
            await queryInterface.addColumn('spotlight_logs', 'user_id', {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            });
            await queryInterface.addColumn('spotlight_logs', 'class_id', {
                type: Sequelize.UUID,
                references: {
                    model: 'classes',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            });
            await queryInterface.addColumn('spotlight_logs', 'source_id', {
                type: Sequelize.UUID,
                references: {
                    model: 'sources',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            });
        } catch(err) {}
    },
    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('spotlight_logs', 'spotlight_id');
        await queryInterface.removeColumn('spotlight_logs', 'annotation_id');
        await queryInterface.removeColumn('spotlight_logs', 'user_id');
        await queryInterface.removeColumn('spotlight_logs', 'class_id');
        await queryInterface.removeColumn('spotlight_logs', 'source_id');
    }
};
