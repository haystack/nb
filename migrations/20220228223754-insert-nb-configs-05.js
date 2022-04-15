'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.bulkInsert('nb_configs', [
            {
                name: 'COMMENT_MEDIA_AUDIO_INSTRUCTOR',
                value: 'false',
                description: 'Enable/Disable audio commenting for instructors'
            },
            {
                name: 'COMMENT_MEDIA_AUDIO_STUDENT',
                value: 'false',
                description: 'Enable/Disable audio commenting for students'
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
    }
};