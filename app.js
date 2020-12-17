require('dotenv').config(); 

const express = require('express');
const app = express();
//bring in controllers - defaults to index.js
const controllers = require('./controllers')


//for user endponts - requires authorization/validation
app.use('/user', controllers.usercontroler);

//for inventory endpoints - requires authorization/validation - requires role access/restriction
app.use('/inventory', controllers.inventorycontroller);

//for order history
app.use('/orders', controllers.orderscontroler);

//for store endpoints - general use that does not require authorization/validation - must be first?
app.use('/', (req, res) => {
  res.send('This is the main endpoint. The store.');
});

app.listen(process.env.PORT, () => {
  console.log(`[SERVER]: Let's get it started, in here! 😜 -- You are running on Port: ${process.env.PORT}.`);
});
