const express = require('express')
const router = express.Router()
const ctrl = require('../controllers') //!!!! путь


router.post('/register', ctrl.register)
router.post('/login', ctrl.login)
router.post('/logout', ctrl.logout)

module.exports = router
