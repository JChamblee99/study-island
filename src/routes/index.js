const express = require('express');
const router = express.Router();

const homeController = require('../controllers/index');
const auth_middleware = require('../middleware/auth');

/* Home Routes*/
//Home page
router.get('/', (req, res) => {
	res.render('home');
});

//Search page
router.get('/search', auth_middleware.isLoggedIn, homeController.Search);

module.exports = router;
