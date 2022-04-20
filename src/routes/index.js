const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

/* Home Routes*/
//Home page
router.get('/', (req, res) => {
	res.render('home');
});

router.get('/search', indexController.Search);

module.exports = router;
