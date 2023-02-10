'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('nb_configs', [
            {
                name: 'SHOW_INDICATOR_FOR_FOLLOW_COMMENT',
                value: 'true',
                description: 'Enable/Disable indicator for follow comment in the list (sidebar)'
            },
            {
                name: 'SPOTLIGHT_FOLLOW_THREAD',
                value: 'false',
                description: 'Enable/Disable spotlight follow thread'
            },
            {
                name: 'CONFIG_SPOTLIGHT_FOLLOW_THREAD',
                value: `{"type":"RIGHT","color":"#334455","header":"<span class='spotlight-header'><span class='spotlight-header-icon follow'><i class='fas fa-user-check'></i></span>By author you <b>follow</b></span>","showTime":"true","headerType":"FOLLOW"}`,
                description: 'Configurations for new spotlight follow thread {type: "TYPE", color: "#FFFFFF", background: "#000000", showTime: true/false}'

            },
            {
                name: 'SPOTLIGHT_ENDORS_THREAD',
                value: 'false',
                description: 'Enable/Disable spotlight endors thread'
            },
            {
                name: 'CONFIG_SPOTLIGHT_ENDORS_THREAD',
                value: `{"type":"RIGHT","color":"#334455","header":"<span class='spotlight-header'><span class='spotlight-header-icon endorsed'>i</span><b>Endorsed</b>by instructor</span>","showTime":"true","headerType":"ENDORSED"}`,
                description: 'Configurations for new spotlight endors thread {type: "TYPE", color: "#FFFFFF", background: "#000000", showTime: true/false}'

            },
        ])
        
        await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_notification_trigger ADD VALUE 'AUTHOR_I_FOLLOW_COMMENTED'")
        await queryInterface.sequelize.query("ALTER TYPE enum_spotlight_logs_trigger ADD VALUE 'AUTHOR_I_FOLLOW_COMMENTED'")
        await queryInterface.sequelize.query("ALTER TYPE enum_nb_logs_notification_trigger ADD VALUE 'INSTRUCTOR_ENDORSED'")
        await queryInterface.sequelize.query("ALTER TYPE enum_spotlight_logs_trigger ADD VALUE 'INSTRUCTOR_ENDORSED'")
    },

    down: async (queryInterface, Sequelize) => {
    }
};

