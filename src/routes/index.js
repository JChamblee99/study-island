const express = require('express');
const router = express.Router();

const homeController = require('../controllers/index');

/* Home Routes*/
//Home page
router.get('/', (req, res) => {
	res.render('home');
});

//Search page
router.get('/search', homeController.Search);

module.exports = router;
