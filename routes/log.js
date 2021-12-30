const express = require('express')
const router = express.Router()
const User = require('../models').User;
const Source = require('../models').Source
const { Op } = require("sequelize")

const SyncLog = require('../models').SyncLog

/**
 * log sync event
 * @name POST/api/log/sync
 */
router.post('/sync', async (req, res) => {
    const user = await User.findByPk(req.user.id)
    const source = await Source.findOne({ where: { [Op.and]: [{ filepath: req.query.url }, { class_id: req.body.class_id }] } })

    try {
        const syncLog = await SyncLog.create(
            {
                class_id: req.body.class_id,
                source_id: source.id,
                annotation_id: req.body.annotation_id,
                user_id: user.id,
                spotlight_type: req.body.spotlight_type.toUpperCase(),
                event: req.body.event.toUpperCase(),
                initiator: req.body.initiator.toUpperCase(),
                order: req.body.order,
                count_source_annotations: req.body.count_source_annotations,
                count_annotation_replies: req.body.count_annotation_replies,
                count_online_students: req.body.count_online_students,
                count_online_instructors: req.body.count_online_instructors,
                is_sync_event: req.body.is_sync_event,
                has_sync_event: req.body.has_sync_event,
                page_position: req.body.page_position.toUpperCase(),
                page_y_offset: req.body.page_y_offset,
                page_height: req.body.page_height,
                role: req.body.role
            },
        )
        res.status(200).json(syncLog)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

module.exports = router