const express = require('express')
const router = express.Router()

const siteControllers = require('../controllers/siteController')

// router.get('/search', siteControllers.search)
router.get('/', siteControllers.index)

module.exports = router