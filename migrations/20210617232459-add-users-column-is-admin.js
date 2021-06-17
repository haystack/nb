'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'is_admin', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'is_admin')
    }
}
