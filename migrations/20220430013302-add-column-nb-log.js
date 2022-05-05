'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event ADD VALUE 'SLIDER_CHANGE'")
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
    await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_event DROP VALUE 'SLIDER_CHANGE'")
    await queryInterface.removeColumn('nb_logs', 'is_comment_endorsed');
    await queryInterface.removeColumn('nb_logs', 'is_comment_followed');
    await queryInterface.removeColumn('nb_logs', 'slider_value');
  }
};
