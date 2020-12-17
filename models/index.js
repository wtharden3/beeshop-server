const User = require('./user');
const Product = require('./product');
const Order = require('./order');

Product.belongsTo(User);
User.hasOne(Product);

//order which is derived from both the Product table (inventory)
// and the User table making the order, has associations
//with two other tables

Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(Product);
Product.belongsTo(Order);

module.exports = { User, Product, Order };
