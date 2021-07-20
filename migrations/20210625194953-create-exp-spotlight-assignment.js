'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('exp_spotligh_assignments', {
            id: {
                allowNull: false,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true,
                type: Sequelize.UUID
            },
            type: {
                type: Sequelize.ENUM,
                values: ['NONE', 'IN', 'BLOCK', 'EM']
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0.
            },
            annotations: {
                type: Sequelize.TEXT,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('exp_spotligh_assignments');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "exp_spotligh_assignment_type";');
    }
};
