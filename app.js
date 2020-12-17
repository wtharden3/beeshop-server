let express = require('express');
let app = express();


//for user endponts - requires authorization/validation
app.use('/user', (req, res) => {
  res.send(
    'This is the USER endpoints. This will be used for login and signup'
  );
});

//for inventory endpoints - requires authorization/validation - requires role access/restriction
app.use('/inventory', (req, res) => {
  res.send(
    'This is the INVENTORY endpoint. This will be used for admin access to edit the inventory of products'
  );
});

//for order history
app.use('/orderhistory', (req, res) => {
  res.send(
    'This is the ORDERHISTORY endpoint that admin and regular user can view and fully interact with.'
  );
});

//for store endpoints - general use that does not require authorization/validation - must be first?
app.use('/', (req, res) => {
  res.send('This is the main endpoint. The store.');
});

app.listen(4040, () => {
  console.log(`[SERVER]: Let's get it started! 😜`);
});
