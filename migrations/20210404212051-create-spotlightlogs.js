'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('spotlight_logs', {
            id: {
                allowNull: false,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true,
                type: Sequelize.UUID
            },
            action: {
                type: Sequelize.ENUM,
                values: ['CLICK', 'HOVER', 'LIKE', 'STAR', 'REPLY_REQUEST', 'BOOKMARK', 'REPLY', 'SESSION_START', 'SESSION_END']
            },
            type: {
                type: Sequelize.ENUM,
                values: ['NONE', 'IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN']
            },
            role: {
                type: Sequelize.ENUM,
                values: ['INSTRUCTOR', 'STUDENT']
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
        await queryInterface.dropTable('spotlight_logs');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_spotlight_logs_action";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_spotlight_logs_type";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_spotlight_logs_role";');
    }
};
