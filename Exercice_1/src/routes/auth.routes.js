const express = require('express')
const router = express.Router()
const passport = require('passport')          
require('../config/passport.js')(passport) 
const authController = require('../controllers/auth.controller.js')

router.post('/register', authController.register)
router.post('/login',  passport.authenticate('local', { session: false }), authController.login)
router.post('/refresh', authController.refresh)

module.exports = router;

