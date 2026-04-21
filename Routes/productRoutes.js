const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const productController = require('../Controllers/productController')

router.post('/add', upload.single('image'), productController.addProduct)

router.post('/update/:id', upload.single('image'), productController.updateProduct)

router.get('/get-all', productController.getProduct)
router.get('/get/:id', productController.getSingleProduct)

router.delete('/delete/:id', productController.deleteProduct)


module.exports = router
