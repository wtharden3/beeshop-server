const express = require('express');
const app = express();
//bring in controllers - defaults to index.js
const controllers = require('./controllers')


//for user endponts - requires authorization/validation
app.use('/user', controllers.usercontroler);

//for inventory endpoints - requires authorization/validation - requires role access/restriction
app.use('/inventory', controllers.inventorycontroller);

//for order history
app.use('/orders', (req, res) => {
  res.send(
    'This is the ORDERS endpoint that admin and regular user can view and fully interact with.'
  );
});

//for store endpoints - general use that does not require authorization/validation - must be first?
app.use('/', (req, res) => {
  res.send('This is the main endpoint. The store.');
});

app.listen(4040, () => {
  console.log(`[SERVER]: Let's get it started! 😜`);
});
