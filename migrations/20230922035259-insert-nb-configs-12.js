'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('nb_configs', [
          {
            name: 'SPOTLIGHT_TA_ENDORS_THREAD',
            value: 'false',
            description: 'Enable/Disable spotlight TA endors thread'
        },
        {
            name: 'CONFIG_SPOTLIGHT_TA_ENDORS_THREAD',
            value: `{"type":"RIGHT","color":"#334455","header":"<span class='spotlight-header'><span class='spotlight-header-icon ta-endorsed'>TA</span><b>Endorsed</b>by TA</span>","showTime":"true","headerType":"TA_ENDORSED"}`,
            description: 'Configurations for new spotlight TA endors thread {type: "TYPE", color: "#FFFFFF", background: "#000000", showTime: true/false}'

        },
        ])
    },

    down: async (queryInterface, Sequelize) => {
    }
};

