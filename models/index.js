// import Sequelize from 'sequelize';
const Sequelize = require("sequelize");

const sequelize = new Sequelize('new_nb_test', 'adriansy', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const models = {
  User: sequelize.import('./Users'),
};

sequelize.sync()
  .catch(error => console.log('This error occured', error));

module.exports = models;