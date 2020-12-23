const { DataTypes } = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM(
      'tops',
      'bottoms',
      'accessories',
      'footwear',
      'sleepwear',
      'intimates'
    ),
    allowNull: false,
  },
  subCategory: {
    type: DataTypes.ENUM(
      'sweatshirts',
      'hoodies',
      'tees',
      'leggings',
      'joggers',
      'shorts',
      'jewelry',
      'socks',
      'shoes',
      'boots',
      'hats'
    ),
    allowNull: true,
  },
  sku: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM(
      'xsmall',
      'small',
      'medium',
      'large',
      'xlarge',
      '2x',
      '3x',
      '4x'
    ),
    allowNull: false,
  },
  adminId_fk: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Product;
