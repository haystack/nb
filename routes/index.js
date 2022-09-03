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
    const regexUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    allConfigs = allConfigs.filter(c => !regexUUID.test(c.name))
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

router.get('/api/check', async (_, res) => {
    res.status(200).json({status: 'OK'})
})

module.exports = router;
