const app = require('./app');

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});