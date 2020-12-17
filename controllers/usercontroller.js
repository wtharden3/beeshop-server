const router = require('express').Router();

//get user data from user table - NOT CREATED YET
router.get('/data', (req, res) => {
  res.send('They call me U-S no H E-R...User');
});

//export this module -- will send to index.js

module.exports = router
