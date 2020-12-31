//importing DataTypes "component/library/module?" from sequelize
const {DataTypes} = require('sequelize');
//bring in db
const db = require('../db');

const User = db.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userRole: {
    type: DataTypes.ENUM(
      'shopper',
      'customer',
      'admin'
    ),
    allowNull: false
  }
})

module.exports = User;
