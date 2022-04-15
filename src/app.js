// npm packages
const express = require('express');

const indexRouter = require('./routes/index');
const islandRouter = require('./routes/islands')
const userRouter = require('./routes/users');
const app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

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

app.use(express.static('public'));

//routes
app.use('/', indexRouter);
app.use('/islands', islandRouter);
app.use('/users', userRouter);

// Cloudflare isolation handler (middleware)
app.use(cloudflare_middleware);

// 404 catch-all handler (middleware)
app.use(status_middleware.status_404);

// 500 error handler (middleware)
app.use(status_middleware.status_500);

module.exports = app;
