const { validationResult, matchedData } = require("express-validator");
const db = require('../db/queries');


function getNewMessage(req, res) {
    res.render('newMessage');
}

async function createMessage(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('newMessage', {
            errors: errors.array(),
            formData: {
                title: req.body.title,
                text: req.body.text,
            }
        });
    }

    try {
        const { title, text } = matchedData(req);

        await db.createMessage(title, text, req.user.id);

        res.redirect('/');
    } catch (err) {
        return next(err);
    }
}

module.exports = { getNewMessage, createMessage };