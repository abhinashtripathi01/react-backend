const router = require('express').Router()
const userControllers = require('../controllers/userControllers')

// Make a create user API
router.post('/create',userControllers.createUser)

//login user API
router.post('/login',userControllers.loginUser)


// controllers -routes- (Index.js)

//exporting
module.exports = router;