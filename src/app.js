// dependencies
const express = require('express');

const indexRouter = require('./routes/index');
const islandRouter = require('./routes/islands')
const userRouter = require('./routes/users');
const app = express();
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const cookie = require('cookie-parser');

// routers
const authRouter = require('./routes/auth.router');

// middleware
const cloudflare_middleware = require('./middleware/cloudflare.js');
const status_middleware = require('./middleware/status-code.js');


// Parse json body submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000);

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

//routes
app.use('/', indexRouter);
app.use('/islands', islandRouter);
app.use('/users', userRouter);

//connect to in-memory db
const { dbConnect, dbDisconnect } = require('../utils/test-utils/dbHandler.utils');
dbConnect();

// Cloudflare isolation handler (middleware)
app.use(cloudflare_middleware);

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// DB Connection
let db = require('./database/db');

// routes
app.use('/auth', authRouter);

app.get('/', (req, res) => {
	res.render('home');
});

// 404 catch-all handler (middleware)
app.use(status_middleware.status_404);

// 500 error handler (middleware)
app.use(status_middleware.status_500);

module.exports = app;
