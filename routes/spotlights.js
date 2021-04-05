const express = require('express');
const router = express.Router();
const Spotlight = require('../models').Spotlight;
const SpotlightLog = require('../models').SpotlightLog;
const Annotation = require('../models').Annotation;
const User = require('../models').User;

/**
 * Make new spotlight for a given annotation
 * @name POST/api/spotlights/spotlight
 * @param annotationId: annotation id to innotate
 * @param position: string enum ('IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN')
 */
router.post('/spotlight', async (req, res) => {
    const annotation = await Annotation.findOne({where: {id: req.body.annotation_id}})
    try {
        const spotlight = await Spotlight.create(
            {
                annotation_id: annotation.id,
                position: req.body.position
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
 * @param position: string enum ('IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN')
 */
router.put('/spotlight/:id', async (req, res) => {
    const spotlight = await Spotlight.findByPk(req.params.id)

    if (!spotlight) {
        res.status(404).send()
    }

    await spotlight.update({
        position: req.body.position
    })
    res.status(200).send()
})

/**
 * Delete a given spotlight
 * @name DELETE/api/spotlights/spotlight/:id
 * @param id: id of spotlight
 * @param position: string enum ('IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN')
 */
router.delete('/spotlight/:id', async (req, res) => {
    const spotlight = await Spotlight.findByPk(req.params.id)

    if (!spotlight) {
        res.status(404).send()
    }

    await spotlight.destroy()
    res.status(200).send()
})

/**
 * Make new spotlight log for a given annotation
 * @name POST/api/spotlights/log
 * @param annotationId: annotation id to innotate
 * @param position: string enum ('IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN')
 * @param action: string enum ('CLICK')
 * @param role: string enum ('INSTRUCTOR', 'STUDENT')
 */
router.post('/log', async (req, res) => {
    const annotation = await Annotation.findOne({where: {id: req.body.annotation_id}})
    const user = await User.findByPk(req.user.id)

    try {
        const spotlightLog = await SpotlightLog.create(
            {
                annotation_id: annotation.id,
                user_id: user.id,
                position: req.body.position.toUpperCase(),
                action: req.body.action,
                role: req.body.role.toUpperCase()
            }, 
        )
        res.status(200).json(spotlightLog)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

module.exports = router;