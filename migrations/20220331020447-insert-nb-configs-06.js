'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('nb_configs', [
      {
        name: 'CONFIG_NB_LOG_EVENTS_ENABLED',
        value: '["CLICK","HOVER","STAR","REPLY_REQUEST","BOOKMARK","REPLY","SESSION_START","SESSION_END","HIDE_HIGHLIGHT","SHOW_HIGHLIGHT","NOTIFICATION_ON","NOTIFICATION_OFF","NEW_ANNOTATION","FILTER","SORT","NEW_ANNOTATION_AUDIO","REPLY_AUDIO","PLAY_MEDIA_AUDIO"]',
        description: 'Configurations for enabled nb log events'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
  }
};