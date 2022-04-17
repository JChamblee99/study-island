const express = require('express');
const router = express.Router();

const homeController = require('../controllers/index');

/* Home Routes*/
//Home page
router.get('/', (req, res) => {
	res.render('home');
});

module.exports = router;
