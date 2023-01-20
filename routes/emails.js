const express = require('express')
const router = express.Router();
const EmailType = require('../models').EmailType
const UserEmailPreference = require('../models').UserEmailPreference


/**
* Get my email preferences
* @name GET/api/email/preference
*/
router.get('/preference', async (req, res) => {
    const preferences = {}
    const allPreferences = await EmailType.findAll({ where: {is_user_managed: true} })
    const userPreferences = await UserEmailPreference.findAll({ where: {user_id: req.user.id}})

    try {
        allPreferences.forEach(p => {
            let o = JSON.parse(JSON.stringify(p))
            o.status = 'ENABLE'
            preferences[o.id] = o
        })

        userPreferences.forEach(p => {
            preferences[p.email_type_id].status = p.status 
        })

    } catch (error) {
        console.error(error);
    }
    
    res.status(200).json(preferences)
})

/**
* Set my email preferences
* @name POST /api/email/preference
*/
router.post('/preference', async (req, res) => {
    for (const p of Object.values(req.body)) {
        const item = await UserEmailPreference.findOne({where: {user_id: req.user.id, email_type_id: p.id}})
        
        if (item) {
            await UserEmailPreference.update({status: p.status}, {where: {user_id: req.user.id, email_type_id: p.id}})
        } else {
            await UserEmailPreference.create({user_id: req.user.id, email_type_id: p.id, status: p.status})
        }
    }
    res.status(200).send()
})


module.exports = router;
