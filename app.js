const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const shortsRouter = require('./routes/shorts');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/dist')));

app.use(session({ secret: 'super-secret-password', saveUninitialized: false, resave: true }));

app.use('/', indexRouter);
app.use('/api/shorts', shortsRouter);
app.use('/api/users', usersRouter);

module.exports = app;
