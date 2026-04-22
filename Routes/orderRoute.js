const express = require('express')
const {createOrder, getOrders} = require('../Controllers/orderController')

const router = express.Router()

router.post('/order', createOrder)
router.get("/orders", getOrders);

module.exports = router
