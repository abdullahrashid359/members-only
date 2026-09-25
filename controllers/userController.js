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

function getLogIn(req, res) {
    const error = req.session.messages?.[0];

    if (req.session.messages) {
        delete req.session.messages;
    }

    res.render('logIn', { error });
}

function logOut(req, res, next) {
    req.logout((err) => {
        if (err)
            return next(err);

        res.redirect('/');
    })
}

function getJoinClub(req, res) {
    res.render('joinClub');
}

async function joinClub(req, res, next) {
    const { passcode } = req.body;

    if (passcode !== process.env.CLUB_PASSCODE)
        return res.render('joinClub', { error: "Passcode is incorrect" });

    try {
        await db.updateMembershipStatus(req.user.id);
        res.redirect('/');
    } catch (err) {
        return next(err);
    }
}

module.exports = { getSignUp, createUser, getLogIn, logOut, getJoinClub, joinClub };