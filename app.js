require('dotenv').config();

const express = require('express');
//bring in db
const db = require('./db');
const app = express();
//bring in controllers - defaults to index.js
const controllers = require('./controllers');

//for user endponts - requires authorization/validation
app.use('/user', controllers.usercontroler);

//for inventory endpoints - requires authorization/validation - requires role access/restriction
app.use('/products', controllers.productscontroller);

//for order history
app.use('/orders', controllers.orderscontroler);

//for store endpoints - general use that does not require authorization/validation - must be first?
app.use('/', (req, res) => {
  res.send('This is the main endpoint. The store.');
});

db.authenticate()
  .then(() => db.sync()) // {force: true} to empty tables
  .then(() => {
    //will wrap this within authenticate() method
    app.listen(process.env.PORT, () => {
      console.log(
        `[SERVER]: Oh yeah! We in dis 😜 -- You are running on Port: ${process.env.PORT}.`
      );
    });
  })
  .catch(err => {
    console.log(`[SERVER]: HOL'UP...The server's down. You played yo'self 👎`)
  })
