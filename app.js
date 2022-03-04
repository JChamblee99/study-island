const express = require('express');

const app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.json('Hello World!');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.send('404 Not Found');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.send('500 Internal Server Error');
});

module.exports = app;
