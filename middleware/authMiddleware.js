function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/log-in');
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.admin_status) {
        return next();
    }

    return res.status(403).send("Forbidden");
}

module.exports = { isAuthenticated, isAdmin };