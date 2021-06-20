require('dotenv').config()
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models').User;

passport.use(new JWTstrategy(
    {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null, token.user)
        } catch (error) {
            done(error)
        }
    }
))

function isAdmin() {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send()
        }

        const user = await User.findByPk(req.user.id)

        if (user.is_admin) {
            return next()
        }

        return res.status(401).send()
    }
}

module.exports = { isAdmin }