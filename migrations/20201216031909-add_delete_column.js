'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('file_system_objects', 'deleted', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false })
        } catch(err) {}
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('file_system_objects', 'deleted')
    }
};
