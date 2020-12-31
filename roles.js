const AccessControl = require('accesscontrol');
const ac = new AccessControl();


ac.grant('shopper')
    .readAny('product')
  .grant('customer')
    .extend('shopper')
    .createOwn('order')
    .deleteOwn('order')
    .readOwn('order')
  .grant('admin')
    .extend('customer')
    .updateAny('order')
    .deleteAny('order')
    .readAny('order')
    .createOwn('product')
    .updateOwn('product')
    .deleteOwn('product')
    .readOwn('product');

// const permission = ac.can('admin').create('product'); //instead of const
// console.log(permission.granted);
// console.log(permission.attributes);


module.exports = ac;
