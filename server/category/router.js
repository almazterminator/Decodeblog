const express = require('express')
const router = express.Router()
const writeDataCategory = require('./seed')
const { getAllCategory } = require('./controller')


router.get('/api/category', getAllCategory)
writeDataCategory()

module.exports = router