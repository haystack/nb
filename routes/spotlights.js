const express = require('express');
const router = express.Router();
const Spotlight = require('../models').Spotlight;
const SpotlightLog = require('../models').SpotlightLog;
const Annotation = require('../models').Annotation;
const User = require('../models').User;
const Class = require('../models').Class;
const Source = require('../models').Source;
const { Op } = require("sequelize");

/**
 * Make new spotlight for a given annotation
 * @name POST/api/spotlights/spotlight
 * @param annotationId: annotation id to innotate
 * @param type: string enum ('IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN')
 */
router.post('/spotlight', async (req, res) => {
    const annotation = await Annotation.findOne({where: {id: req.body.annotation_id}})
    try {
        const spotlight = await Spotlight.create(
            {
                annotation_id: annotation.id,
                type: req.body.type
            }, 
        )
        res.status(200).json(spotlight)
    } catch (error) {
        res.status(400).json(error)
    }
})

/**
 * Edit a given spotlight
 * @name PUT/api/spotlights/spotlight/:id
 * @param id: id of spotlight
 * @param type: string enum ('IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN')
 */
router.put('/spotlight/:id', async (req, res) => {
    const spotlight = await Spotlight.findByPk(req.params.id)

    if (!spotlight) {
        res.status(404).send()
    }

    await spotlight.update({
        type: req.body.type
    })
    res.status(200).send()
})

/**
 * Delete a given spotlight
 * @name DELETE/api/spotlights/spotlight/:id
 * @param id: id of spotlight
 * @param type: string enum ('IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN')
 */
router.delete('/spotlight/:id', async (req, res) => {
    const spotlight = await Spotlight.findByPk(req.params.id)

    if (!spotlight) {
        res.status(404).send()
    }

    await spotlight.update({
        type: 'NONE'
    })
    res.status(200).send()
})

/**
 * Make new spotlight log for a given annotation
 * @name POST/api/spotlights/log
 * @param annotationId: annotation id to innotate
 * @param type: string enum ('IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN', 'NOTIFICATION_LIST', 'NOTIFICATION_POPUP', 'NOTIFICATION_HIGHLIGHT')
 * @param action: string enum ('CLICK', 'HOVER', 'LIKE', 'STAR', 'REPLY_REQUEST', 'BOOKMARK', 'REPLY')
 * @param role: string enum ('INSTRUCTOR', 'STUDENT')
 */
router.post('/log', async (req, res) => {
    const spotlight = req.body.spotlight_id ? await Spotlight.findByPk(req.body.spotlight_id) : {}
    const annotation = await Annotation.findByPk(req.body.annotation_id)
    const user = await User.findByPk(req.user.id)
    const source = await Source.findOne({ where: { [Op.and]: [ {filepath: req.query.url}, {class_id: req.body.class_id} ] }})

    try {
        const spotlightLog = await SpotlightLog.create(
            {
                spotlight_id: req.body.spotlight_id ? spotlight.id : null,
                annotation_id: annotation.id,
                user_id: user.id,
                type: req.body.type.toUpperCase(),
                action: req.body.action,
                role: req.body.role.toUpperCase(),
                class_id: req.body.class_id,
                source_id: source.id,
            }, 
        )
        res.status(200).json(spotlightLog)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

/**
 * Log user session start
 * @name POST/api/spotlights/log/session/start
 */
router.post('/log/session/start', async (req, res) => {
    const user = await User.findByPk(req.user.id)
    const source = await Source.findOne({ where: { [Op.and]: [ {filepath: req.query.url}, {class_id: req.body.class_id} ] }})

    try {
        const spotlightLog = await SpotlightLog.create(
            {
                user_id: user.id,
                type: 'NONE',
                action: 'SESSION_START',
                role: req.body.role.toUpperCase(),
                class_id: req.body.class_id,
                source_id: source.id,
            }, 
        )
        res.status(200).json(spotlightLog)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

/**
 * Log user session end
 * @name POST/api/spotlights/log/session/end
 */
router.post('/log/session/end', async (req, res) => {
    const user = await User.findByPk(req.user.id)
    const source = await Source.findOne({ where: { [Op.and]: [ {filepath: req.query.url}, {class_id: req.body.class_id} ] }})

    try {
        const spotlightLog = await SpotlightLog.create(
            {
                user_id: user.id,
                type: 'NONE',
                action: 'SESSION_END',
                role: req.body.role.toUpperCase(),
                class_id: req.body.class_id,
                source_id: source.id,
            }, 
        )
        res.status(200).json(spotlightLog)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})


module.exports = router;