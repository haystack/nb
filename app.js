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
const auth = require('./auth/auth')
const socketapi = require("./socketapi") // used for socket.io

const app = express()
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
app.use('/api/admin', passport.authenticate('jwt', { session: false }), auth.isAdmin(), adminRouter)

// Handle errors.
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({ success: false, error: err })
})

module.exports = app
