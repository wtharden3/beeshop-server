const router = require('express').Router();
const validateSession = require('../middleware/validateSession');
const { Order } = require('../models');
//const { restore } = require('../models/user');

//test
// pop@email.com
// pass

// C - CREATE / POST
router.post('/placeorder', (req, res) => {
  let orderEntry = {
    total: req.body.order.total,
    //total: (req.body.order.subTotal * req.body.order.tax) + req.body.order.subTotal + req.body.order.shippingFee,
    subTotal: req.body.order.subTotal,
    tax: req.body.order.tax,
    details: req.body.order.details,
    shippingFee: req.body.order.shippingFee,
    hasShipped: req.body.order.hasShipped,
    customerId_fk: req.user.id, //based on user (association) but does not automatically associate
  };

  Order.create(orderEntry)
    .then(order =>
      res.status(200).json({ order, message: 'Your order has ben placed' })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: err, message: 'the route worked but check the data' })
    );
});
// R - READ / GET
//get all -admin
router.get('/admin/orders', (req, res) => {
  Order.findAll()
    .then(order => {
      if (order) {
        res.status(200).json({ order, message: 'All of the Orders' });
      } else {
        res.status(500).json({ message: 'no orders found' });
      }
    })
    .catch(err =>
      res.status(500).json({ error: err, message: 'the findAll did not work' })
    );
});

// get by userid
router.get('/:customerId/orders', (req, res) => {
  Order.findAll({ where: { customerId_fk: req.params.customerId } }).then(myorders =>
    res.status(200).json({ myorders, message: 'Here is a list of YOUR orders' })
  );
});
// U - UPDATE / PUT
router.put('/edit/:orderid', validateSession, (req, res) => {
  //console.log('req----> ', req)
  const updateOrder = {
    total: req.body.order.total,
    subTotal: req.body.order.subTotal,
    tax: req.body.order.tax,
    details: req.body.order.details,
    shippingFee: req.body.order.shippingFee,
    hasShipped: req.body.order.hasShipped
  };
  //console.log('req.body.order----> ', req.body.order)

  const query = {where: {id: req.params.orderid}};

  Order.update(updateOrder, query)
  .then(order => {
    if(order){
      res.status(200).json({order, message: `${order} order(s) was updated`})
    } else {
      res.status(500).json({message: 'there are no orders to edit'})
    }
  })
  .catch(err => res.status(500).json({error: err, message: 'there was an error searching or editing the order'}))
})
// D - DELETE
router.delete('/delete/:orderid', (req, res) => {
  const query = {where: {id: req.params.orderid}};
  Order.destroy(query)
  .then(() => res.status(200).json({message: 'This order has been deleted'}))
  .catch(err => res.status(500).json({error: err, message: 'there was an error deleting this Order'}))
})

//protected route that only admin has access to
router.get('/admin/all', (req, res) => {
  res.send(`I'm the biggest boss that you seen thus far --Rick Ross`);
});

//getby userid is next

module.exports = router;
