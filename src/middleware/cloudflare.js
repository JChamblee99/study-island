const cloudflareIp = require('cloudflare-ip');

module.exports = cloudflare = (req, res, next) => {
    // Cloudflare isolation is disabled for local development and review apps.
    if (["production"].indexOf(process.env.NODE_ENV) == -1) {
        return next();
    }

    // The last IP within the header is set by Heroku's load balancer.
    // First IP is the source client, the second should be Cloudflare.
    if (req.get('x-forwarded-for')) {
        const fwd = req.get('x-forwarded-for').split(',');
        if (fwd.length == 2 && cloudflareIp(fwd[1]))
            return next();
    }

    res.status(418);
    res.end();
}