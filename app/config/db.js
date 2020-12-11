require('dotenv').config()

const { Sequelize } = require('sequelize');
module.exports = new Sequelize('customers', process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
  });

