'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('exp_spotligh_logs', {
            id: {
                allowNull: false,
                defaultValue: Sequelize.UUIDV1,
                primaryKey: true,
                type: Sequelize.UUID
            },
            event: {
                type: Sequelize.ENUM,
                values: ['CLICK', 'HOVER', 'STAR', 'REPLY_REQUEST', 'BOOKMARK', 'REPLY', 'SESSION_START', 'SESSION_END', 'HIDE_HIGHLIGHT', 'SHOW_HIGHLIGHT', 'NEW_ANNOTATION']
            },
            initiator: {
                type: Sequelize.ENUM,
                values: ['NONE', 'SPOTLIGHT', 'LIST', 'HIGHLIGHT']
            },
            type: {
                type: Sequelize.ENUM,
                values: ['NONE', 'IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN']
            },
            order: {
                type: Sequelize.INTEGER,
            },
            high_quality: {
                type: Sequelize.BOOLEAN,
            },
            source_annotations_count: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0.
            },
            annotation_replies_count: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0.
            },
            exp_group: {
                type: Sequelize.ENUM,
                values: ['NONE', 'CONTROL', 'TREATMENT']
            },
            exp_type: {
                type: Sequelize.ENUM,
                values: ['NONE', 'IN', 'BLOCK', 'EM']
            },
            exp_quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0.
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
        await queryInterface.dropTable('exp_spotligh_logs');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "exp_spotligh_logs_event";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "exp_spotligh_logs_type";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "exp_spotligh_logs_location";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "exp_spotligh_logs_exp_group";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "exp_spotligh_logs_exp_type";');
    }
};
