const router = require('express').Router()
const productControllers = require('../controllers/productControllers')

// Make a create user API
router.post('/create',productControllers.createProduct)

// controllers -routes- (Index.js)

//fetch all 
router.get('/get_all_products', productControllers.getAllProducts)
// fetch single product
// If POST, body(data)
router.get('/get_single_product/:id', productControllers.getProduct)

// delete Product
router.delete('/delete_product/:id', productControllers.deleteProduct)

//exporting
module.exports = router;