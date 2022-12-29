const express = require('express')
const passport = require('passport')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const Source = require('./models').Source
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const classesRouter = require('./routes/classes')
const filesRouter = require('./routes/files')
const annotationsRouter = require('./routes/annotations')
const spotlightsRouter = require('./routes/spotlights')
const gradesRouter = require('./routes/grades')
const adminRouter = require('./routes/admin')
const logRouter = require('./routes/log')
const consentRouter = require('./routes/consents')
const followRouter = require('./routes/follow')
const auth = require('./auth/auth')
const socketapi = require("./socketapi")
const history = require('connect-history-api-fallback');

const app = express()

app.get('/api/check', async (_, res) => {
    res.status(200).json({status: 'OK'})
})

app.use('/uploads', express.static('public/uploads'))
app.use('/media', express.static('public/media'))
app.use('/.well-known/acme-challenge', express.static('public/.well-known/acme-challenge'))

// NB1 redirects
app.use('/', (req, res, next) => {
    if (req.url === '/embed_NB.js') {
        return res.redirect(301, 'https://nb1.mit.edu/embed_NB.js')
    }

    if (req.url.startsWith('/c/') 
    || req.url.startsWith('/f/')
    || req.url.startsWith('/pdf4/rpc')
    || req.url.startsWith('/content/')
    || req.url.startsWith('/settings')) {
        return res.redirect(301, `https://nb1.mit.edu${req.url}`)
    }

    next()
})

app.use(history())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/dist')))
app.set('socketio', socketapi.io)

app.use(cors({
    origin: async function (origin, callback) {
        if (
            !origin
            || origin.includes('csail.mit.edu')
            || origin == 'https://127.0.0.1:8080'
            || origin == 'https://localhost:8080'
        ) {
            callback(null, true)
        } else {
            const source = Source.findOne({ where: { origin: origin } })
            if (source) {
                callback(null, true)
            } else {
                console.log(origin)
                callback(new Error('Not allowed by CORS'))
            }
        }
    },
    credentials: true
}))



app.use('/', express.static('public'))
app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/classes', passport.authenticate('jwt', { session: false }), classesRouter)
app.use('/api/files', passport.authenticate('jwt', { session: false }), filesRouter)
app.use('/api/annotations', passport.authenticate('jwt', { session: false }), annotationsRouter)
app.use('/api/spotlights', passport.authenticate('jwt', { session: false }), spotlightsRouter)
app.use('/api/grades', passport.authenticate('jwt', { session: false }), gradesRouter)
app.use('/api/log', passport.authenticate('jwt', { session: false }), logRouter)
app.use('/api/consent', passport.authenticate('jwt', { session: false }), consentRouter)
app.use('/api/follow', passport.authenticate('jwt', { session: false }), followRouter)
app.use('/api/admin', passport.authenticate('jwt', { session: false }), auth.isAdmin(), adminRouter)

// Handle errors.
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({ success: false, error: err })
})

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
})

module.exports = app
