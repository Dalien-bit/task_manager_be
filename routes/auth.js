const User = require('../models/User')

const express = require('express')
const router = express.Router()

const { register, login } = require('../controller/auth.js')

router.post('/register', register)
router.post('/login', login)

module.exports = router