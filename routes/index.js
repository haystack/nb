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
router.get('/api/nb/config', async (req,res) => {
    let configs = {}
    const q = await NbConfig.findAll({attributes: ['name', 'value']})
    q.forEach((c, i) => configs[c.name] = c.value)
    res.status(200).json(configs)
});

module.exports = router;
