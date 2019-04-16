const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classesRouter = require('./routes/classes');
const filesRouter = require('./routes/files');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist')));

app.use(session({ secret: 'super-secret-password', saveUninitialized: false, resave: true }));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/classes', classesRouter);
app.use('/api/files', filesRouter);

module.exports = app;
