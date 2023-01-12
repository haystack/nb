'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('nb_configs', [
            {
                name: 'NB_DASHBOARD_TOP_MSG',
                value: 'false',
                description: 'Enable/Disable NB dashboard top msg'
            },
            {
                name: 'CONFIG_NB_DASHBOARD_TOP_MSG',
                value: `{"style":"background: #000; color: #fff","html":"<span>MSG</span>"}`,
                description: 'Configurations NB dashboard top msg {style: "background: #000...", html: "<span>MSG</span>"'

            },
            {
                name: 'NB_CLIENT_TOP_MSG',
                value: 'false',
                description: 'Enable/Disable NB client top msg'
            },
            {
                name: 'CONFIG_NB_CLIENT_TOP_MSG',
                value: `{"style":"background: #000; color: #fff","html":"<span>MSG</span>"}`,
                description: 'Configurations NB client top msg {style: "background: #000...", html: "<span>MSG</span>"'

            },
        ])
        
    },

    down: async (queryInterface, Sequelize) => {
    }
};

