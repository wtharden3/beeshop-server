let express = require('express');
let app = express();

//for store endpoints - general use that does not require authorization/validation - must be first?
app.use('/', (req, res) => {
  res.send('This is the main endpoint. The store.');
});

//for user endponts - requires authorization/validation
app.use('/user', (req, res) => {
  res.send(
    'This is the user endpoints. This will be used for login and signup'
  );
});

//for inventory endpoints - requires authorization/validation - requires role access/restriction
app.use('/inventory', (req, res) => {
  res.send(
    'This is the inventory endpoint. This will be used for admin access to edit the inventory of products'
  );
});

//for order history
app.use('/orderhistory', (req, res) => {
  res.send(
    'This is the orderhistory endpoint that admin and regular user can view and fully interact with.'
  );
});

app.listen(4040, () => {
  console.log(`[SERVER]: Let's get it started! 😜`);
});
