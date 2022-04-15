'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event ADD VALUE 'NEW_ANNOTATION_AUDIO'")
    await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event ADD VALUE 'REPLY_AUDIO'")
    await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event ADD VALUE 'PLAY_MEDIA_AUDIO'")
  }

};
