'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('spotlights', 'annotation_id', { type: Sequelize.UUID, references: { model: 'annotations', key: 'id', }, onDelete: 'CASCADE' })
        } catch(err) {}
    },
    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('spotlights', 'annotation_id');
    }
};
