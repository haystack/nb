const express = require('express');
const router = express.Router();
const Followers = require('../models').Followers;
const User = require('../models').User;


/**
* Get all followings  
* @name GET/api/follow/user
*/
router.get('/user', async (req, res) => {
    try {
        const follows = await Followers.findAll({ where: { user_id: req.user.id}})
        res.status(200).json( follows );
    } catch(err) {
        res.status(400).json({ msg: err.errors[0].message })
    }
})

/**
* Follow user
* @name POST/api/follow/user
* @param username: username to follow 
*/
router.post('/user', async (req, res) => {
    if (!req.body.username) {
        res.status(401).json(null);
        return null;
    }

    const user = await User.findOne({ where: { username: req.body.username }})

    if (!user) {
        res.status(400).json({ msg: "This user does not exist." });
        return null;
    } else if (user.id === req.user.id){
        res.status(401).json({msg: "You cannot follow yourself."});
    } else {
        try {
            await Followers.create({ user_id: req.user.id, follower_id: user.id})
            const data = await Followers.findAll({ where: { user_id: req.user.id}})
            res.status(200).json(data);
        } catch (err) {
            res.status(400).json({ msg: "You already follow this user." })
        }
    }
})

/**
* Unfollow user
* @name DELETE/api/follow/user
* @param username: username to unfollow 
*/
router.delete('/user', async (req, res) => {
    if (!req.body.username) {
        res.status(200).json(null);
        return null;
    }

    const user = await User.findOne({ where: { username: req.body.username }})

    if (!user) {
        res.status(200).json(null);
        return null;
    } else if (user.id === req.user.id){
        res.status(401).json({msg: "You cannot unfollow yourself"});
    } else {
        try {
            await Followers.destroy({where:{user_id: req.user.id, follower_id: user.id}})
            const data = await Followers.findAll({ where: { user_id: req.user.id}})
            res.status(200).json(data);
        } catch(err) {
            res.status(400).json({ msg: err.errors[0].message })
        }
    }
});

module.exports = router;