const {DataTypes} = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  productDescription: {
    type: DataTypes.STRING,
    allowNull: true
  }, 
  productCategory: {
    type:DataTypes.ENUM(
      'tops', 'bottoms', 'accessories', 'footwear', 'sleepwear', 'intimates'
    ),
    allowNull: false
  },
  productSubCatetory: {
    type: DataTypes.ENUM(
      'sweatshirts', 'hoodies', 'tees', 'leggings', 'joggers', 'shorts', 'jewelry', 'socks', 'shoes', 'boots', 'hats'
    ),
    allowNull: true
  },
  sku: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  size: {
    type: DataTypes.ENUM(
      'xsmall', 'small', 'medium', 'large', 'xlarge', '2x', '3x', '4x'
    ),
    allowNull: false
  }
})

module.exports = Inventory