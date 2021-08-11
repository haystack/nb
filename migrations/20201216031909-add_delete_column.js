'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('file_system_objects', 'deleted', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('file_system_objects', 'deleted')
    }
};
