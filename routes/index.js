
var express = require('express');
var router = express.Router();

// router.get('/', indexController.home);
  
const coursesRouter = require('./courses')
const siteRouter = require('./site')
const cartRouter = require('./cart')


router.use('/cart', cartRouter);
router.use('/courses', coursesRouter);
router.use('/', siteRouter);





  
  module.exports = router;