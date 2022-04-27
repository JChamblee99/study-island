const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

//Get all users
router.get('/', userController.getAllUsers);

//Get user page
router.get('/:userId', userController.getUser);

// //Edit user
// router.put('/users/:id', islandController.editUserById);

module.exports = router;