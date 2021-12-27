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
    const regexUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
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
 * Get NB course assignments
 * @name GET/api/admin/course/:course/assignments
 */
router.get('/course/:course/assignments', async (req, res) => {
    const q = await ExpSpotlighAssignment.findAll({ attributes: ['source_id'], group: ['source_id'], where: { class_id: req.params.course } })
    res.status(200).json(q)
})

/**
 * Set NB course assignment for source
 * @name POST/api/admin/:course/source/:source/assignment
 */
router.post('/course/:course/source/:source/assignment', async (req, res) => {
    const q = await NbConfig.findOne({ attributes: ['name', 'value'], where: { name: req.params.course } })
    const courseConfig = JSON.parse(q.value)

    if (courseConfig.expSpotlight) {
        const bulk = []
        const treatment = courseConfig.expSpotlight.treatment
        const types = ['NONE', 'IN', 'BLOCK', 'EM']
        const quantities = [6, 10]
        const typesAllocation = {}
        const quantitiesAllocation = {}
        const typeGroupLength = Math.ceil(treatment.length / types.length)
        const quantitiesGroupLength = Math.ceil(treatment.length / quantities.length)

        types.forEach((element, index) => { typesAllocation[index] = new Array(typeGroupLength).fill(element) })
        quantities.forEach((element, index) => { quantitiesAllocation[index] = new Array(quantitiesGroupLength).fill(element) })

        treatment.forEach(user => {
            let type
            let quantity

            while (!type) {
                let t = Math.floor(Math.random() * types.length)
                type = typesAllocation[t].pop()
            }

            while (!quantity) {
                let q = Math.floor(Math.random() * quantities.length)
                quantity = quantitiesAllocation[q].pop()
            }

            bulk.push({
                class_id: req.params.course,
                source_id: req.params.source,
                user_id: user,
                type: type,
                quantity: quantity,
            })
        })

        console.log(typesAllocation);
        console.log(quantitiesAllocation);

        try {
            await ExpSpotlighAssignment.bulkCreate(bulk)
            return res.status(200).send()
        } catch (error) {
            console.log(error);
            return res.status(400).json(error)
        }
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