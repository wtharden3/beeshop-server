const User = require('./user');
const Product = require('./product');
const Order = require('./order');

User.hasMany(Product); //merchant creating products
Product.belongsTo(User)

User.hasMany(Order); //customer creating orders full of product the merchant created 
Order.belongsTo(User);

// Product.belongsTo(User);
// Order.belongsTo(User);

//order which is derived from both the Product table (inventory)
// and the User table making the order, has associations
//with two other tables

// User.hasMany(Order);

// Order.hasMany(Product);
// Product.belongsTo(Order);

module.exports = { User, Product, Order };
