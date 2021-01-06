const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Img = require('./img');

User.hasMany(Product, { foreignKey: 'adminId_fk', sourceKey: 'id' }); //merchant creating products
Product.belongsTo(User, { foreignKey: 'adminId_fk', targetKey: 'id' });

User.hasMany(Order, { foreignKey: 'customerId_fk', sourceKey: 'id' }); //customer creating orders full of product the merchant created
Order.belongsTo(User, { foreignKey: 'customerId_fk', targetKey: 'id' });

Product.hasMany(Img, { foreignKey: 'productId_fk', sourceKey: 'id' }); //customer creating orders full of product the merchant created
Order.belongsTo(Product, { foreignKey: 'productId_fk', targetKey: 'id' });

module.exports = { User, Product, Order, Img };
