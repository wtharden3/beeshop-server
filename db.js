//require('dotenv').config(); //do I need this since it is in app.js?

const {Sequelize} = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
})

module.exports = db;