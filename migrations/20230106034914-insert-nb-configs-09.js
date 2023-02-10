'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('nb_configs', [
            {
                name: 'SPOTLIGHT_QUESTION_THREAD',
                value: 'false',
                description: 'Enable/Disable spotlight follow thread'
            },
            {
                name: 'CONFIG_SPOTLIGHT_QUESTION_THREAD',
                value: `{"type":"RIGHT","color":"#334455","header":"<span class='spotlight-header'><span class='spotlight-header-icon question'><i class='fas fa-question'></i></span><b>Question?</b></span>","showTime":"true","headerType":"QUESTION"}`,
                description: 'Configurations for new spotlight follow thread {type: "TYPE", color: "#FFFFFF", background: "#000000", showTime: true/false}'

            },
            {
                name: 'CONFIG_SPOTLIGHT_GENERAL_THREAD',
                value: `{"type":"RIGHT","color":"#334455","header":"<span class='spotlight-header'><span class='spotlight-header-icon general'><i class='fas fa-comment'></i></span>From the<b>comments</b></span>","showTime":"true","headerType":"GENERAL"}`,
                description: 'Configurations for new spotlight general thread {type: "TYPE", color: "#FFFFFF", background: "#000000", showTime: true/false}'

            },
        ])
        
    },

    down: async (queryInterface, Sequelize) => {
    }
};

