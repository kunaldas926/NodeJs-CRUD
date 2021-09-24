const express = require('express');
const router =  express.Router();

router.get('/',(req,res)=>{
  res.send(`server is running on ${req.protocol}://${req.header('x-forwarded-host') || req.get('host') + req.originalUrl}`);
});

router.use(require('./admin/index'));
router.use(require('./device/index'));
router.use(require('./desktop/index'));
router.use(require('./client/index'));

module.exports = router;