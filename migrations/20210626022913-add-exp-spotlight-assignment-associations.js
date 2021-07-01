'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('exp_spotligh_assignments', 'class_id', {
            type: Sequelize.UUID,
            references: {
                model: 'classes',
                key: 'id',
            },
            onDelete: 'CASCADE',
        });
        await queryInterface.addColumn('exp_spotligh_assignments', 'source_id', {
            type: Sequelize.UUID,
            references: {
                model: 'sources',
                key: 'id',
            },
            onDelete: 'CASCADE',
        });
        await queryInterface.addColumn('exp_spotligh_assignments', 'user_id', {
            type: Sequelize.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('exp_spotligh_assignments', 'user_id');
        await queryInterface.removeColumn('exp_spotligh_assignments', 'class_id');
        await queryInterface.removeColumn('exp_spotligh_assignments', 'source_id');
    }
};
