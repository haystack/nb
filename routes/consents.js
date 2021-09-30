const express = require('express')
const router = express.Router()
const User = require('../models').User
const Consent = require('../models').Consent
const jwt = require('jsonwebtoken');

require('dotenv').config();

/**
 * Set conset for a given user and consent type
 * @name POST/api/consent
 * @param name: name of consent
 */
router.post('/', async (req, res) => {
    try {
        const consent = await Consent.findOne({ where: { name: req.body.name } })
        const user = await User.findOne({ where: { id: req.user.id }, include: [{ association: 'Consents' }, { association: 'Dissents' }] })

        if (req.body.consent === 'true' && consent) {
            await consent.addConsentee(user);
            await consent.removeDissenter(user);
        } else {
            await consent.removeConsentee(user);
            await consent.addDissenter(user);
        }

        const updatedUser = await User.findOne({ where: { id: req.user.id }, include: [{ association: 'Consents' }, { association: 'Dissents' }] })
        const token = jwt.sign({ user: updatedUser }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        res.sendStatus(400)
    }
})

module.exports = router