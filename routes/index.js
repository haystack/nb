const express = require('express');
const router = express.Router();
const NbConfig = require('../models').NbConfig;

/**
* Serves homepage.
* @name GET/
*/
router.get('/', (req, res) => {
    res.render('index', { title: 'NB' });
});

/**
* Get all nb configs
* @name GET/api/nb/config
*/
router.get('/api/nb/config', async (req, res) => {
    let configs = {}
    let allConfigs = await NbConfig.findAll({ attributes: ['name', 'value'] })
    allConfigs = allConfigs.filter(c => c.value === 'true' || c.value === 'false')
    allConfigs.forEach((c, i) => configs[c.name] = c.value)

    if (req.query.course) {
        const courseConfigs = await NbConfig.findOne({ attributes: ['name', 'value'], where: { name: req.query.course } })
        if (courseConfigs) {
            const cc = JSON.parse(courseConfigs.value)
            cc.configs.forEach(c => configs[c.name] = c.value)
        }
    }

    res.status(200).json(configs)
});

module.exports = router;
