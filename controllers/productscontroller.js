const router = require('express').Router();
const {Product} = require('../models')

// C - CREATE / POST
router.post('/addtoinventory', (req,res) =>{
  const  orderEntry = {productName, description, category, subCatetory, sku, adminId_fk: req.product.adminId_fk } = req.body;
  Product.create(orderEntry)
  .then(order => res.status(200).json(order))
  .catch(err => res.status(500).json({error: err, message: 'the route worked but something else did not'}))
})
// R - READ / GET
// U - UPDATE / PUT
// D - DELETE 


//view all will need to be at the bottom
router.get('/admin/inventory', (req, res) => {
  res.send(`I got whatcha want, I got what you need!`);
});

module.exports = router;
