const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

//Get all users
router.get('/', userController.getAllUsers);

module.exports = router;