'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('nb_configs', {
            name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            value: {
                type: Sequelize.STRING,
                unique: false,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                unique: false,
                allowNull: true
            },
        });
    },
    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('nb_configs');
    }
};
