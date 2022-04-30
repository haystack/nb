const express = require('express')
const router = express.Router()
const User = require('../models').User;
const Source = require('../models').Source
const NbLog = require('../models').NbLog
const { Op } = require("sequelize")

/**
 * log nb event
 * @name POST/api/log/nb
 */
router.post('/nb', async (req, res) => {


    // Hot fix to stop logging sync events
    try {
        const ignoreEvents = ["SYNC_RECEIVED_ANNOTATION", "SYNC_RECEIVED_REPLY", "SYNC_RECEIVED_CONNECTION"]
        if (req.body.event && ignoreEvents.includes(req.body.event.toUpperCase())) {
            return res.status(200).json({})
        }
    } catch (error) {

    }

    const user = await User.findByPk(req.user.id)
    const source = await Source.findOne({ where: { [Op.and]: [{ filepath: req.query.url }, { class_id: req.body.class_id }] } })

    try {
        const nbLog = await NbLog.create(
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
                is_sync_annotation: req.body.is_sync_annotation,
                has_sync_annotation: req.body.has_sync_annotation,
                notification_trigger: req.body.notification_trigger,
                page_position: req.body.page_position.toUpperCase(),
                page_y_offset: parseInt(req.body.page_y_offset, 10),
                page_height: parseInt(req.body.page_height, 10),
                role: req.body.role,
                applied_filter: req.body.applied_filter,
                applied_sort: req.body.applied_sort,
                is_comment_endorsed: req.body.comment_endorsed,
                is_comment_followed: req.body.comment_followed,
                slider_value: req.body.slider_value

            },
        )
        res.status(200).json(nbLog)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

module.exports = router
