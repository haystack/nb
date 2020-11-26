const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const Source = require('./models').Source;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classesRouter = require('./routes/classes');
const filesRouter = require('./routes/files');
const annotationsRouter = require('./routes/annotations');
const gradesRouter = require('./routes/grades');

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/dist')));
app.use(cors({
  origin: function(origin, callback){
    if (
      !origin
      || origin == 'https://127.0.0.1:8080'
      || origin == 'https://jumana-nb.csail.mit.edu'
      || origin == 'https://localhost:8080'
    ){
      callback(null, true);
    }
    else{
      Source.findOne({where: {origin: origin}}).then((source) => {
        if (source){
          callback(null, true);
        } else {
          console.log(origin);
          callback( new Error('Not allowed by CORS'));
        }
      });
    }

  },
  credentials: true}));

//Need to make dynamic function that reads from url sources and checks origin.

app.use(session({ 
    secret: 'super-secret-password',
    name: 'nb.user.id',
    cookie:{
      secure: true,
      httpOnly: false,
      sameSite: 'none'
    },
    saveUninitialized: false, 
    resave: true,
    rolling: true
}));

app.use('/', express.static('public'));
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/classes', classesRouter);
app.use('/api/files', filesRouter);
app.use('/api/annotations', annotationsRouter);
app.use('/api/grades', gradesRouter);

module.exports = app;
