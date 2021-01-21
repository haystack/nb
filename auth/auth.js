const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy(
    {
        secretOrKey: 'TOP_SECRET',
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