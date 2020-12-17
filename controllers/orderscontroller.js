let router = require('express').Router();

//protected route that only admin has access to
router.get('/admin/all', (req, res) => {
  res.send(`I'm the biggest boss that you seen thus far --Rick Ross`);
});

//getby userid is next

module.exports = router
