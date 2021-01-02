const router = require('express').Router();
const validateSession = require('../middleware/validateSession');
const { Order } = require('../models');
const ac = require('../roles');
//const { restore } = require('../models/user');

//test
// pop@email.com
// pass

// C - CREATE / POST
router.post('/placeorder', (req, res) => {
  const permission = ac.can(req.user.userRole).createOwn('order');
  let orderEntry = {
    //total: (req.body.order.subTotal * req.body.order.tax) + req.body.order.subTotal + req.body.order.shippingFee,
    total: req.body.order.total,
    subTotal: req.body.order.subTotal,
    tax: req.body.order.tax,
    details: req.body.order.details,
    shippingFee: req.body.order.shippingFee,
    hasShipped: req.body.order.hasShipped,
    customerId_fk: req.user.id, //based on user (association) but does not automatically associate
  };

  if (permission.granted) {
    Order.create(orderEntry)
      .then(order =>
        res.status(200).json({ order, message: 'Just throw it in the bag!' })
      )
      .catch(err =>
        res
          .status(500)
          .json({ error: err, message: 'the route worked but check the data' })
      );
  } else {
    res.status(500).json({ message: 'sorry, no window shoppers' });
  }
});
// R - READ / GET
//get all -admin
router.get('/list', (req, res) => {
  const permission = ac.can(req.user.userRole).readAny('order');

  if (permission.granted && req.user.userRole === 'admin') {
    Order.findAll()
      .then(order => {
        if (order) {
          res.status(200).json({ order, message: 'All of the Orders' });
        } else {
          res.status(500).json({ message: 'no orders found' });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: err, message: 'the findAll did not work' })
      );
  } else if (req.user.userRole === 'customer') {
    //this will make it so the customer can only see their own orders
    const query = { where: { customerId_fk: req.user.id } };
    Order.findAll(query)
      .then(order => {
        console.log('ORDER MANE===>', order);
        if (order.length > 0) {
          res
            .status(200)
            .json({ order, message: 'Here are all of YOUR orders' });
        } else {
          console.log('this');
          res.status(500).json({ message: "You don't have any orders" });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err, message: "Opps, couldn't findAll your orders" });
      });
  } else {
    res.status(500).json({ message: "Oh, you can't see that" });
  }
});

// get by userid == don't need this endpoint right now
// router.get('/:customerId/orders', (req, res) => {
//   Order.findAll({
//     where: { customerId_fk: req.params.customerId },
//   }).then(myorders =>
//     res.status(200).json({ myorders, message: 'Here is a list of YOUR orders' })
//   );
// });

// U - UPDATE / PUT
router.put('/edit/:orderid', validateSession, (req, res) => {
  const adminPermission = ac.can(req.user.userRole).updateAny('order');
  //const customerPermission = ac.can(req.user.userRole).updateOwn('order');

  //console.log('req----> ', req)
  const updateOrder = {
    total: req.body.order.total,
    subTotal: req.body.order.subTotal,
    tax: req.body.order.tax,
    details: req.body.order.details,
    shippingFee: req.body.order.shippingFee,
    hasShipped: req.body.order.hasShipped,
  };
  //console.log('req.body.order----> ', req.body.order)

  if (adminPermission.granted) {
    const query = { where: { id: req.params.orderid } };
    Order.update(updateOrder, query)
      .then(order => {
        if (order) {
          res
            .status(200)
            .json({ order, message: `${order} order(s) was updated` });
        } else {
          res.status(500).json({ message: 'there are no orders to edit' });
        }
      })
      .catch(err =>
        res.status(500).json({
          error: err,
          message: 'there was an error searching or editing the order',
        })
      );
  } else if (req.user.userRole === 'customer') {
    console.log('this is a customer', req.user.userRole)
    const query = {
      where: { id: req.params.orderid, customerId_fk: req.user.id },
    };
    Order.update(updateOrder, query)
      .then(order => {
        if (order.length > 0) {
          res
            .status(200)
            .json({ order, message: `${order} order(s) was updated` });
        } else {
          res
            .status(500)
            .json({ message: 'there are none of YOUR orders to edit' });
        }
      })
      .catch(err =>
        res.status(500).json({
          error: err,
          message: 'there was an error searching or editing YOUR order',
        })
      );
  } else {
    res.status(500).json({ message: 'no permission granted' });
  }
});
// D - DELETE
router.delete('/delete/:orderid', (req, res) => {
  const adminPermission = ac.can(req.user.userRole).deleteAny('order');
  const customerPermission = ac.can(req.user.userRole).deleteOwn('order');

  if(adminPermission.granted){
  const query = { where: { id: req.params.orderid } };
  Order.destroy(query)
    .then(() =>
      res.status(200).json({ message: 'This order has been deleted by the admin' })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: err, message: 'there was an error deleting this Order' })
    );

  } else if(customerPermission.granted){
    const query = {
      where: { id: req.params.orderid, customerId_fk: req.user.id },
    };
  Order.destroy(query)
    .then(deleted =>
      res.status(200).json({ deleted, message: 'You deleted your order' })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: err, message: 'there was an error deleting this Order' })
    );
  } else {
    res.status(500).json({message: 'you cannot delete that'})
  }

});

//protected route that only admin has access to
// router.get('/admin/all', (req, res) => {
//   res.send(`I'm the biggest boss that you seen thus far --Rick Ross`);
// });

//getby userid is next

module.exports = router;
