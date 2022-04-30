'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('annotations', 'endorsed', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('annotations', 'endorsed')
    }
};