const User = require('./user');
const Product = require('./product');
const Order = require('./order');

User.hasMany(Product); //merchant creating products
Product.belongsTo(User, {foreignKey: 'adminId_fk', targetKey: 'id'})

User.hasMany(Order); //customer creating orders full of product the merchant created 
Order.belongsTo(User, {foreignKey: 'customerId_fk', targetKey: 'id'});

module.exports = { User, Product, Order };
