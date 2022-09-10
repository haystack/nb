'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.addColumn('annotations', 'endorsed', {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            });
        } catch(err) {}
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('annotations', 'endorsed')
    }
};