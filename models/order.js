const {DataTypes} = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subTotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tax: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingFee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hasShipped: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  customerId_fk: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Order;