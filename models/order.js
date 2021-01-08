const {DataTypes} = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  totalCost: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalItems: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // tax: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // details: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // shippingFee: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // hasShipped: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false
  // },
  customerId_fk: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Order;