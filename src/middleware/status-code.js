module.exports.status_404 = (req, res, next) => {
    res.status(404);
    res.render('404');
}

module.exports.status_500 = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
}