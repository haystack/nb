const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models').User;

passport.use(
    'register', 
    new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {
            const user = await User.create({
                username:   username,
                first_name: req.body.first_name,
                last_name:  req.body.last_name,
                email:      req.body.email,
                password:   password
            })
            
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
));

passport.use(
    'login',
    new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username }})
  
            if (!user) {
                return done(null, false, { msg: "No user with username " + username });
            }
    
            const validate = await user.validPassword(password);
    
            if (!validate) {
                return done(null, false, { msg: 'Incorrect password' });
            }
  
            return done(null, user, { msg: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    }
));

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