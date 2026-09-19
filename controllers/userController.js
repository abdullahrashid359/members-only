const { validationResult, matchedData } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require('../db/queries');

function getSignUp(req, res) {
    res.render('signUp');
};

async function createUser(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('signUp', {
            errors: errors.array(),
            formData: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
            }
        });
    }

    try {
        const { firstName, lastName, username, password } = matchedData(req);
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.createUser(firstName, lastName, username, hashedPassword);

        res.redirect('/log-in');
    } catch (err) {
        return next(err);
    }
}

module.exports = { getSignUp };