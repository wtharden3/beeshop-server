const router = require('express').Router();

//test
// pop@email.com
// pass
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4MzQ2MTg1LCJleHAiOjE2MDg0MzI1ODV9.tVERXfYFotuPi_xaWO_cxepgb9dhaJsKWbb0okT-6CA

//protected route that only admin has access to
router.get('/admin/all', (req, res) => {
  res.send(`I'm the biggest boss that you seen thus far --Rick Ross`);
});

//getby userid is next

module.exports = router
