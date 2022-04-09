// dependencies
const express = require('express');
const app = express();
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const cookie = require('cookie-parser');

// controllers
const auth = require('./controllers/auth.controller');

// middleware
const cloudflare_middleware = require('./middleware/cloudflare.js');
const status_middleware = require('./middleware/status-code.js');

let COOKIE_SECRET = '7yhhs3n7cplj2b3k79o7'; // random dev string

if(process.env.COOKIE_SECRET) {
	COOKIE_SECRET = process.env.COOKIE_SECRET; // actual secret
}

// main config
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookie(COOKIE_SECRET));

// {secure: true} breaks sessions in non-https environments
// This insures that cookies are secure in Production where it matters
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' )
{
	app.use(session({
		secret: COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: true }
	}));
} else {
	app.use(session({
		secret: COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false }
	}));
}

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

// DB Connection
let db = require('./database/db');

app.set('port', process.env.PORT || 3000);

// shows registration page to user
app.get('/register', auth.showRegistration);

// receives registration data, processes it, and handles auth
app.post('/register', auth.registerNewUser);

// shows login page to user
app.get('/login', auth.showLogin);

// receives registration login data and handles auth
app.post('/login', auth.loginUser);

// logs out a user
app.post('/logout', auth.logoutUser);

app.get('/', (req, res) => {
	res.render('home');
});

// 404 catch-all handler (middleware)
app.use(status_middleware.status_404);

// 500 error handler (middleware)
app.use(status_middleware.status_500);

module.exports = app;
