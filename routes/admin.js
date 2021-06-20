const express = require('express')
const router = express.Router()
const User = require('../models').User
const Class = require('../models').Class
const NbConfig = require('../models').NbConfig;

/**
 * Check if logged in user is an admin
 * @name GET/api/check
 */
router.get('/check', async (req, res) => {
    const user = await User.findByPk(req.user.id)
    res.status(200).json(user)
})

/**
 * Get all NB courses
 * @name GET/api/courses
 */
router.get('/courses', async (req, res) => {
    const courses = await Class.findAll()
    res.status(200).json(courses)
})

/**
 * Get all NB globle configs
 * @name GET/api/configs
 */
router.get('/configs', async (req, res) => {
    let q = await NbConfig.findAll({ attributes: ['name', 'value'] }) // TODO: querey only globle
    q = q.filter(c => c.value === 'true' || c.value === 'false')
    res.status(200).json(q)
})

/**
 * Get NB course configs
 * @name GET/api/:course/configs
 */
router.get('/course/:course/configs', async (req, res) => {
    const q = await NbConfig.findOne({ attributes: ['name', 'value'], where: { name: req.params.course } })
    res.status(200).json(q)
})

/**
 * Set NB course configs
 * @name GET/api/:course/configs
 */
router.post('/course/:course/configs', async (req, res) => {
    const courseConfig = await NbConfig.findOne({ attributes: ['name', 'value'], where: { name: req.params.course } })
    if (courseConfig) {
        await NbConfig.update({ value: JSON.stringify(req.body) }, { where: { name: req.params.course } })
    } else {
        await NbConfig.create({ name: req.params.course, value: JSON.stringify(req.body) }, { fields: ['name', 'value'] })
    }
    res.status(200).send()
})

module.exports = router