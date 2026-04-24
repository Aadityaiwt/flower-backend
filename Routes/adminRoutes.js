const express = require('express')

const router = express.Router()

const adminController = require('../Controllers/adminController')

router.post('/signup', adminController.signup)

router.post('/create-admin', adminController.signup)

router.post('/login', adminController.login)

module.exports =  router;