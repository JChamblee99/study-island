// dependencies
const express = require('express');
const app = express();
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const cookie = require('cookie-parser');

// middleware
const cloudflare_middleware = require('./middleware/cloudflare.js');
const status_middleware = require('./middleware/status-code.js');

const COOKIE_SECRET = 'keyboardcat';

// main config
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookie(COOKIE_SECRET))
app.use(session({
	secret: COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

// Cloudflare isolation handler (middleware)
app.use(cloudflare_middleware);

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Passport Config
const User = require('./database/models/user.model');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// DB Connection
let db = require('./database/db');

app.set('port', process.env.PORT || 3000);

app.get('/register', (req, res) => {
	// res.sendFile(path.resolve(__dirname, '../public/www/register.html'));
	res.render('register');
});

app.post('/register', (req, res) => {

	console.log(req.body.username);
	console.log(req.body.password);

	User.register(new User({
		username: req.body.username,
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName
	}), req.body.password, function (err, user) {
		if (err) {
			return res.render('error', "Registration error")
		}

		passport.authenticate('local')(req, res, function () {
			res.render('home')
		})
	})

});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}));

app.get('/', (req, res) => {
	res.render('home');
});

// 404 catch-all handler (middleware)
app.use(status_middleware.status_404);

// 500 error handler (middleware)
app.use(status_middleware.status_500);

module.exports = app;
