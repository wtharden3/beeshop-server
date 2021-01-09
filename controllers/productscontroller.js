const router = require('express').Router();
const { Product, Img } = require('../models');
const ac = require('../roles');
let validateSession = require('../middleware/validateSession');

// Image upload dependencies
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-v2');
//need and image model?

const s3 = new aws.S3();
//end img upload dependencies

//Image upload functionality
aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-2',
});

const imgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

router.post(
  '/upload/img',
  imgUpload.single('image'),
  validateSession,
  (req, res) => {
    const ImgEntry = {
      title: req.body.img.title,
      description: req.body.post.description,
      productId_fk: req.user.id,
    };

    if (req.user.userRole === 'admin') {
      Img.create(ImgEntry)
        .then(entry =>
          res.status(200).json({ entry, message: 'Image uploaded' })
        )
        .catch(err =>
          res.status(500).json({ error: err, message: 'upload failed' })
        );
    } else {
      res
        .status(500)
        .json({
          message: "you don't have access to upload an image for this product",
        });
    }
  }
);

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
    productCost: req.body.product.productCost,
    description: req.body.product.description,
    category: req.body.product.category,
    subCategory: req.body.product.subCategory,
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

//add /inventory/:productName - no validateSession
//add /inventyr/:category - no validateSession
//add /inventory/:subCategory - no validateSession
//add /inventory/:size - no validateSession

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

//find one by id
router.get('/:productid', (req,res) => {
  const query = {where: {id: req.params.productid}};
  Product.findOne(query)
  .then(product => {
    if(product){
      res.status(200).json({product, message: 'ok, big spender! 😉'})
    } else {
      res.status(500).json({message: 'oops, gotta be quicker than that. That product is not available'})
    }
  })
  .catch(error => res.status(500).json({error, message: 'we could not add that item to your cart'}))
})

// U - UPDATE / PUT
router.put('/edit/:productid', validateSession, (req, res) => {
  const permission = ac.can(req.user.userRole).updateOwn('product');
  const updateProduct = {
    productName: req.body.product.productName,
    productCost: req.body.product.productCost,
    description: req.body.product.description,
    category: req.body.product.category,
    subCategory: req.body.product.subCategory,
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
router.delete('/delete/:productid', validateSession, (req, res) => {
  const permission = ac.can(req.user.userRole).deleteOwn('product');
  const query = { where: { id: req.params.productid } };

  if (permission.granted) {
    Product.destroy(query)
      .then(() => res.status(200).json({ message: 'Product Deleted' }))
      .catch(err => res.status(500).json({ error: err }));
  } else {
    res.status(500).json({ message: "You can't remove me!" });
  }
});

module.exports = router;
