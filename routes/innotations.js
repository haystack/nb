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
    const annotation = await Annotation.findOne({where: {id: req.body.annotationId}})
    const innotation = await Innotation.create({
            annotation_id: annotation.id,
            position: req.body.position
        }, {
            include: [{association: 'Annotation'}]
        }
    )
    res.status(200).json(innotation)
})

/**
 * Edit a given innotation
 * @name PUT/api/innotations/innotation/:id
 * @param id: id of innotation
 * @param position: string enum
 */
router.put('/innotation/:id', async (req, res) => {
    const innotation = await Innotation.findByPk(req.params.id)
    await innotation.update({
        position: req.body.position
    })
    res.status(200)
})

/**
 * Delete a given innotation
 * @name DELETE/api/innotations/innotation/:id
 * @param id: id of innotation
 * @param position: string enum
 */
router.delete('/innotation/:id', async (req, res) => {
    const innotation = await Innotation.findByPk(req.params.id)
    await innotation.destroy()
    res.status(200)
})

module.exports = router;