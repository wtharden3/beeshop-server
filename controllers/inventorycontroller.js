let router = require('express').Router();

//view all will need to be at the bottom
router.get('/', (req, res) => {
  res.send(`I got whatcha want, I got what you need!`);
});

module.exports = router;
