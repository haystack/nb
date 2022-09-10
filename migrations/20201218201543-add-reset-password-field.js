'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('users', 'reset_password_id', { type: Sequelize.UUID, unique: true, allowNull: true })
        } catch(err) {}
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'reset_password_id')
    }
};