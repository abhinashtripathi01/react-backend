const router = require('express').Router()
const productControllers = require('../controllers/productControllers')

// Make a create user API
router.post('/create',productControllers.createProduct)

// controllers -routes- (Index.js)

//fetch all 
router.get('/get_all_products', productControllers.getAllProducts)

//exporting
module.exports = router;