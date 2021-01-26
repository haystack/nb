const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const donenv = require('dotenv');

donenv.config();

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