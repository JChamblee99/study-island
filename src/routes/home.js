const express = require('express');
const router = express.Router();

const Home = require('../controllers/home');

/* Home Routes*/
//Home page
router.get('/', res.render('home'));

module.exports = router;
