// dependencies
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');

// routers
const authRouter = require('./routes/auth.router');
const indexRouter = require('./routes/index');
const islandRouter = require('./routes/islands')
const userRouter = require('./routes/users');

// app level middleware
const cloudflare_middleware = require('./middleware/cloudflare.js');
const status_middleware = require('./middleware/status-code.js');

app.set('port', process.env.PORT || 3000);

const COOKIE_SECRET = process.env.COOKIE_SECRET || '7yhhs3n7cplj2b3k79o7';

// main config
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookie(COOKIE_SECRET));
app.use(express.json());

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

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

//routes
app.use('/', indexRouter);
app.use('/islands', islandRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

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
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/islands', islandRouter);
app.use('/users', userRouter);

// 404 catch-all handler (middleware)
app.use(status_middleware.status_404);

// 500 error handler (middleware)
app.use(status_middleware.status_500);

module.exports = app;
