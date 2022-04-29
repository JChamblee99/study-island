const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

const auth_middleware = require('../middleware/auth');

router.use(auth_middleware.isLoggedIn);

//Get current User's page
router.get('/', userController.getCurrentUser)

//Get all users
router.get('/all', userController.getAllUsers);

//Get user page
router.get('/:userId', userController.getUser);

// //Edit user
// router.put('/users/:id', islandController.editUserById);

module.exports = router;