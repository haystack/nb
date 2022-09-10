'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('users', 'is_admin', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false })
        } catch(err) {}
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'is_admin')
    }
}
