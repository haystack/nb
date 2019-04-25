const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const Source = require('./models').source;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classesRouter = require('./routes/classes');
const filesRouter = require('./routes/files');
const annotationsRouter = require('./routes/annotations');

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist')));
app.use(cors({
  origin: function(origin, callback){
    if(!origin || origin == 'http://localhost:8080'){
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

app.use(session({ secret: 'super-secret-password', 
    cookie:{
      secure: false,
      httpOnly: false},
    saveUninitialized: false, resave: true }));
app.use('/', express.static('public'));
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/classes', classesRouter);
app.use('/api/files', filesRouter);
app.use('/api/annotations', annotationsRouter);

module.exports = app;
