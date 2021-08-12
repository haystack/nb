'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.bulkInsert('nb_configs', [
            {
                name: 'SYNC_FEATURES',
                value: 'false',
                description: 'Enable/Disable Sync features'
            },
            {
                name: 'SHOW_NUMBER_OF_REPLIES',
                value: 'true',
                description: 'Enable/Disable number of replies in the list (sidebar)'
            },
            {
                name: 'SHOW_INDICATOR_FOR_UNSEEN_THREAD',
                value: 'true',
                description: 'Enable/Disable indicator for unseen thread in the list (sidebar)'
            },
            {
                name: 'SHOW_INDICATOR_FOR_INSTRUCTOR_COMMENT',
                value: 'true',
                description: 'Enable/Disable indicator for instructor comment in the list (sidebar)'
            },
            {
                name: 'SHOW_INDICATOR_FOR_SPOTLIT_THREAD',
                value: 'true',
                description: 'Enable/Disable indicator for spotlit thread in the list (sidebar)'
            },
            {
                name: 'SHOW_INDICATOR_FOR_NOTIFIED_THREAD',
                value: 'true',
                description: 'Enable/Disable indicator for notified thread in the list (sidebar)'
            }, {
                name: 'SHOW_INDICATOR_FOR_QUESTIONED_THREAD',
                value: 'true',
                description: 'Enable/Disable indicator for questioned thread in the list (sidebar)'
            },
            {
                name: 'IGNORE_SECTIONS_IN_CLASS',
                value: 'false',
                description: 'Enable/Disable showing only section comments for students'
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
    }
};
