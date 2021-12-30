const express = require('express')
const router = express.Router()
const User = require('../models').User
const Class = require('../models').Class
const ExpSpotlighAssignment = require('../models').ExpSpotlighAssignment
const NbConfig = require('../models').NbConfig;
const Consent = require('../models').Consent

/**
 * Check if logged in user is an admin
 * @name GET/api/admin/check
 */
router.get('/check', async (req, res) => {
    const user = await User.findByPk(req.user.id)
    res.status(200).json(user)
})

/**
 * Get all NB courses
 * @name GET/api/admin/courses
 */
router.get('/courses', async (req, res) => {
    const courses = await Class.findAll({
        include: [
            { association: 'Instructors' },
            { association: 'Sections' },
            { association: 'Sources', include: [{ association: 'Files' }] },
            { association: 'Creator' },
            { association: 'Sections' },
        ]
    })
    res.status(200).json(courses)
})

/**
 * Get all NB global configs
 * @name GET/api/admin/configs
 */
router.get('/configs', async (req, res) => {
    let q = await NbConfig.findAll({ attributes: ['name', 'value'] }) // TODO: querey only global
    const regexUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    q = q.filter(c => !regexUUID.test(c.name))
    res.status(200).json(q)
})

/**
 * Get NB course configs
 * @name GET/api/admin/:course/configs
 */
router.get('/course/:course/configs', async (req, res) => {
    const q = await NbConfig.findOne({ attributes: ['name', 'value'], where: { name: req.params.course } })
    res.status(200).json(q)
})

/**
 * Get NB course info
 * @name GET/api/admin/:course/info
 */
router.get('/course/:course/info', async (req, res) => {
    const q = await Class.findByPk(req.params.course, {
        include: [
            { association: 'GlobalSection', include: [{ association: 'MemberStudents', attributes: ['id', 'username', 'first_name', 'last_name'] }] },
        ]
    })
    res.status(200).json(q)
})

/**
 * Set NB course configs
 * @name POST/api/admin/:course/configs
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

/**
 * Get all consent with consentees
 * @name GET/api/admin/consent
 */
router.get('/consent', async (req, res) => {
    const consents = await Consent.findAll({
        include: [
            { association: 'Consentees' },
            { association: 'Dissenters' },
        ]
    })
    res.status(200).json(consents)
})

/**
 * Create new consent type
 * @name POST/api/admin/consent
 */
router.post('/consent', async (req, res) => {
    const consent = await Consent.create({ name: req.body.name })
    res.status(200).json(consent)
})

module.exports = router