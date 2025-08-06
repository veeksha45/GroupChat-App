const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('signup_db', 'root', 'veeksha', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
