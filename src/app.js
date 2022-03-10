// npm packages
const express = require('express');
const app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware
const cloudflare_middleware = require('./middleware/cloudflare.js');
const status_middleware = require('./middleware/status_code.js');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// Cloudflare isolation handler (middleware)
app.use(cloudflare_middleware);

app.get('/', (req, res) => {
	res.render('home');
});

// 404 catch-all handler (middleware)
app.use(status_middleware.status_404);

// 500 error handler (middleware)
app.use(status_middleware.status_500);

module.exports = app;
