const userController = require('../controller/userController')
const express = require('express')
const router = express.Router()

router.post('/addUser' ,userController.addUser)
router.post('/login' ,userController.userLogin)
router.get('/',userController.getAlluser)
module.exports = router