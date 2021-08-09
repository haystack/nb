const express = require('express')
const router = express.Router()
const Annotation = require('../models').Annotation;
const User = require('../models').User;
const NbConfig = require('../models').NbConfig
const ExpSpotlighAssignment = require('../models').ExpSpotlighAssignment
const Source = require('../models').Source
const ExpSpotlightLog = require('../models').ExpSpotlightLog
const { Op } = require("sequelize")

/**
* Check if class has spotlight exp
* @name GET/api/exp/spotlight
*/
router.get('/spotlight', async (req, res) => {
    const courseConfig = await NbConfig.findOne({ attributes: ['name', 'value'], where: { name: req.query.class } })
    if (courseConfig) {
        const config = JSON.parse(courseConfig.value)
        if (config.expSpotlight) {
            return res.status(200).json(config.expSpotlight)
        }
    }
    res.status(200).send()
})

/**
* Check if source started exp
* @name GET/api/exp/spotlight/source
*/
router.get('/spotlight/source', async (req, res) => {
    const source = await Source.findOne({ where: { [Op.and]: [{ filepath: req.query.url }, { class_id: req.query.class }] } })
    if (source) {
        const q = await ExpSpotlighAssignment.findAll({ attributes: ['source_id'], group: ['source_id'], where: { [Op.and]: [{ source_id: source.id }, { class_id: req.query.class }] } })
        res.status(200).json(q)
    } else {
        res.status(200).json({})
    }
})

/**
* Get user assignment for course and source
* @name GET/api/exp/spotlight/source
*/
router.get('/spotlight/source/assignment', async (req, res) => {
    const source = await Source.findOne({ where: { [Op.and]: [{ filepath: req.query.url }, { class_id: req.query.class }] } })
    if (source) {
        const q = await ExpSpotlighAssignment.findOne({ where: { [Op.and]: [{ source_id: source.id }, { class_id: req.query.class }, { user_id: req.user.id }] } })
        return res.status(200).json(q)
    }
    res.status(200).send()
})

/**
 * Set annotation assignment for user
 * @name POST/api/exp/spotlight/source/assignment/annotations
 */
router.post('/spotlight/source/assignment/annotations', async (req, res) => {
    const assignment = await ExpSpotlighAssignment.findByPk(req.query.assignment)
    if (assignment) {
        await assignment.update({ annotations: JSON.stringify(req.body) })
    }
    res.status(200).send()
})

/**
 * log spotlight exp
 * @name POST/api/exp/spotlight/log
 */
router.post('/spotlight/log', async (req, res) => {
    const user = await User.findByPk(req.user.id)
    const source = await Source.findOne({ where: { [Op.and]: [{ filepath: req.query.url }, { class_id: req.body.class_id }] } })

    try {
        const expSpotlightLog = await ExpSpotlightLog.create(
            {
                class_id: req.body.class_id,
                source_id: source.id,
                annotation_id: req.body.annotation_id,
                user_id: user.id,
                type: req.body.type.toUpperCase(),
                event: req.body.event.toUpperCase(),
                initiator: req.body.initiator.toUpperCase(),
                order: req.body.order,
                high_quality: req.body.highQuality,
                source_annotations_count: req.body.source_annotations_count,
                annotation_replies_count: req.body.annotation_replies_count,
                exp_group: req.body.exp_group,
                exp_type: req.body.exp_type,
                exp_quantity: req.body.exp_quantity
            },
        )
        res.status(200).json(expSpotlightLog)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

module.exports = router
