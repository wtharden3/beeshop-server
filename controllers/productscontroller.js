const router = require('express').Router();
const { Product } = require('../models');

// C - CREATE / POST
router.post('/addtoinventory', (req, res) => {
  //console.log('from productcontroler-- req-->', req);
  const orderEntry = {
    productName: req.body.product.productName,
    description: req.body.product.description,
    category: req.body.product.category,
    subCategory: req.body.product.subCategory,
    sku: req.body.product.sku,
    size: req.body.product.size,
    adminId_fk: req.user.id,
  };

  Product.create(orderEntry)
    .then(order => res.status(200).json(order))
    .catch(err =>
      res.status(500).json({
        error: err,
        message: 'the route worked but something else did not',
      })
    );
});
// R - READ / GET

//get all
router.get('/admin/inventory', (req, res) => {
  Product.findAll()
    .then(products => {
      if (products.length > 0) {
        res
          .status(200)
          .json({ products, message: 'here are all the products' });
      } else {
        res.status(500).json({ message: 'there are no products' });
      }
    })
    .catch(err =>
      res.status(500).json({ error: err, message: 'the findall did not work' })
    );
});
// U - UPDATE / PUT
// D - DELETE

//view all will need to be at the bottom
// router.get('/inventory', (req, res) => {
//   res.send(`I got whatcha want, I got what you need!`);
// });

module.exports = router;
