const router = require('express').Router();
const { Product } = require('../models');
const ac = require('../roles');
let validateSession = require('../middleware/validateSession');

// C - CREATE / POST
router.post('/addtoinventory', validateSession, (req, res) => {
  //console.log('from productcontroler-- req-->', req);
  const permission = ac.can(req.user.userRole).createOwn('product');
  console.log('permission.grant', permission.granted);
  console.log('permission.attributes', permission.attributes);
  console.log('userRole====>', req.user.userRole);
  //Rick Boss needs to add to inventory
  const productEntry = {
    productName: req.body.product.productName,
    description: req.body.product.description,
    category: req.body.product.category,
    subCategory: req.body.product.subCategory,
    sku: req.body.product.sku,
    size: req.body.product.size,
    adminId_fk: req.user.id,
  };

  if (permission.granted) {
    Product.create(productEntry)
      .then(product => res.status(200).json(product))
      .catch(err =>
        res.status(500).json({
          error: err,
          message: 'the route worked but something else did not',
        })
      );
  } else {
    res.status(500).json({ message: 'No Access allowed!' });
  }
});
// R - READ / GET

//get all -- all have access
router.get('/inventory', (req, res) => {
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
router.put('/edit/:productid', validateSession, (req, res) => {
  const permission = ac.can(req.user.userRole).updateOwn('product');
  const updateProduct = {
    productName: req.body.product.productName,
    description: req.body.product.description,
    category: req.body.product.category,
    subCategory: req.body.product.subCategory,
    sku: req.body.product.sku,
    size: req.body.product.size,
  };

  const query = { where: { id: req.params.productid } };

  if (permission.granted) {
    Product.update(updateProduct, query)
      .then(product => {
        if (product) {
          res
            .status(200)
            .json({ message: `${product} product(s) was/were updated` });
        } else {
          res.status(500).json({ message: `no products were updated` });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: err, message: 'something went wrong with the update' })
      );
  } else {
    res.status(500).json({ message: "nope! don't touch that product" });
  }
});
// D - DELETE
router.delete('/admin/delete/:productid', validateSession, (req, res) => {
  const query = { where: { id: req.params.productid } };

  Product.destroy(query)
    .then(() => res.status(200).json({ message: 'Product Deleted' }))
    .catch(err => res.status(500).json({ error: err }));
});

//view all will need to be at the bottom
// router.get('/inventory', (req, res) => {
//   res.send(`I got whatcha want, I got what you need!`);
// });

module.exports = router;
