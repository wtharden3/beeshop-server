//we are importing the controllers to export them later
// we are exporting them as an object - ex. usercontroller is a property with
// the value of require('./usercontroller.js') which is the usercontroller file
// we manage our user routes in
module.exports = {
  usercontroler: require('./usercontroller'),
  productscontroller: require('./productscontroller'),
  orderscontroler: require('./orderscontroller')
}