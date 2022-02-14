
const express = require('express');
const cloudflareIp = require('cloudflare-ip');

let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// Cloudflare isolation handler (middleware)
app.use(function(req, res, next) {
	// Cloudflare isolation is disabled in the development environment.
	if (process.env.NODE_ENV !== 'production')
		return next();

	// The last IP within the header is set by Heroku's load balancer.
	// First IP is the source client, the second should be Cloudflare.
	if (req.get('x-forwarded-for')) {
		const fwd = req.get('x-forwarded-for').split(',');
		if (fwd.length == 2 && cloudflareIp(fwd[1]))
			return next();
	}
});

app.get('/', function(req, res) {
	res.send('Hello World!');
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

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
