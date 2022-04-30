'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('nb_logs', 'event', 
      {type: Sequelize.ENUM,
      values: ['CLICK', 'HOVER', 'STAR', 'REPLY_REQUEST', 'BOOKMARK', 'REPLY', 'SESSION_START', 'SESSION_END', 'HIDE_HIGHLIGHT', 'SHOW_HIGHLIGHT', 'NOTIFICATION_ON', 'NOTIFICATION_OFF', 'NEW_ANNOTATION', 'SYNC_RECEIVED_ANNOTATION', 'SYNC_RECEIVED_REPLY', 'SYNC_RECEIVED_CONNECTION', 'SCROLL', 'FILTER', 'SORT', 'SLIDER_CHANGE']}
    )
    await queryInterface.addColumn('nb_logs', 'is_comment_endorsed', {
      type:  Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
  });
  await queryInterface.addColumn('nb_logs', 'is_comment_followed', {
    type:  Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  });
  await queryInterface.addColumn('nb_logs', 'slider_value', {
    type:  Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0.
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('nb_logs', 'event', 
    {type: Sequelize.ENUM,
    values: ['CLICK', 'HOVER', 'STAR', 'REPLY_REQUEST', 'BOOKMARK', 'REPLY', 'SESSION_START', 'SESSION_END', 'HIDE_HIGHLIGHT', 'SHOW_HIGHLIGHT', 'NOTIFICATION_ON', 'NOTIFICATION_OFF', 'NEW_ANNOTATION', 'SYNC_RECEIVED_ANNOTATION', 'SYNC_RECEIVED_REPLY', 'SYNC_RECEIVED_CONNECTION', 'SCROLL', 'FILTER', 'SORT']}
  )
    await queryInterface.removeColumn('nb_logs', 'is_comment_endorsed');
    await queryInterface.removeColumn('nb_logs', 'is_comment_followed');
    await queryInterface.removeColumn('nb_logs', 'slider_value');
  }
};
