const express = require('express');
const router = express.Router();

// controller
const auth = require('../controllers/auth.controller');

// shows registration page to user
router.get('/register', auth.showRegistration);

// receives registration data, processes it, and handles auth
router.post('/register', auth.registerNewUser);

// shows login page to user
router.get('/login', auth.showLogin);

// receives registration login data and handles auth
router.post('/login', auth.loginUser);

// logs out a user
router.post('/logout', auth.logoutUser);

// shows email verification page to user
router.get('/request-email-verification/:userId/:email', auth.requestEmailVerification);

// receives verification email 
router.get('/verify-email/:token', auth.verifyEmail);

module.exports = router;