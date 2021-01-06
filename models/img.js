const {DataTypes} = require('sequelize');
const db = require('../db');

const Img = db.define('img', {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
  allowNull: true
  },
  productId_fk: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Img;