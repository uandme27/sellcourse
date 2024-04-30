const express = require('express')
const router = express.Router()

const courseControllers = require('../controllers/courseController')


router.get('/', courseControllers.index)
router.get('/deteil/:id', courseControllers.deteil)
router.get('/watch/', courseControllers.watchCourse)

module.exports = router