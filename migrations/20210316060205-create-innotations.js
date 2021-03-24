'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('innotations', {
            id: {
                allowNull: false,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true,
                type: Sequelize.UUID
            },
            position: {
                type: Sequelize.ENUM,
                values: ['IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT']
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
        await queryInterface.dropTable('innotations');
    }
};