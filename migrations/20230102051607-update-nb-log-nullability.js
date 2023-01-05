'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query("ALTER TABLE nb_logs ALTER COLUMN count_annotation_replies DROP NOT NULL;")
        await queryInterface.sequelize.query("ALTER TABLE nb_logs ALTER COLUMN is_sync_annotation DROP NOT NULL;")
        await queryInterface.sequelize.query("ALTER TABLE nb_logs ALTER COLUMN has_sync_annotation DROP NOT NULL;")
        await queryInterface.sequelize.query("ALTER TABLE nb_logs ALTER COLUMN is_comment_endorsed DROP NOT NULL;")
        await queryInterface.sequelize.query("ALTER TABLE nb_logs ALTER COLUMN is_comment_followed DROP NOT NULL;")
    },

    down: async (queryInterface, Sequelize) => {
    }
};

