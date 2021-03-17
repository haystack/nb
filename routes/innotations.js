const express = require('express');
const router = express.Router();
const Innotation = require('../models').Innotation;
const Annotation = require('../models').Annotation;

/**
 * Make new innotation for a given annotation
 * @name POST/api/innotations/innotation
 * @param annotationId: annotation id to innotate
 * @param position: string enum
 */
router.post('/innotation', async (req, res) => {
    const annotation = await Annotation.findOne({where: {id: req.body.annotation_id}})
    try {
        const innotation = await Innotation.create(
            {
                annotation_id: annotation.id,
                position: req.body.position
            }, 
        )
        res.status(200).json(innotation)
    } catch (error) {
        res.status(400).json(error)
    }
})

/**
 * Edit a given innotation
 * @name PUT/api/innotations/innotation/:id
 * @param id: id of innotation
 * @param position: string enum
 */
router.put('/innotation/:id', async (req, res) => {
    const innotation = await Innotation.findByPk(req.params.id)

    if (!innotation) {
        res.status(404).send()
    }

    await innotation.update({
        position: req.body.position
    })
    res.status(200).send()
})

/**
 * Delete a given innotation
 * @name DELETE/api/innotations/innotation/:id
 * @param id: id of innotation
 * @param position: string enum
 */
router.delete('/innotation/:id', async (req, res) => {
    const innotation = await Innotation.findByPk(req.params.id)

    if (!innotation) {
        res.status(404).send()
    }

    await innotation.destroy()
    res.status(200).send()
})

module.exports = router;