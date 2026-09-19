const { body } = require('express-validator');
const { Router } = require('express');
const userController = require('../controllers/userController');
const passport = require("../config/passport");
const db = require('../db/queries');

const userRouter = Router();

const validateUser = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required.")
        .isLength({ min: 1, max: 50 })
        .withMessage("First name must be between 1 and 50 characters.")
        .isAlpha()
        .withMessage("First name must contain only letters."),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required.")
        .isLength({ min: 1, max: 50 })
        .withMessage("Last name must be between 1 and 50 characters.")
        .isAlpha()
        .withMessage("Last name must contain only letters."),

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .isLength({ min: 3, max: 255 })
        .withMessage("Username must be between 3 and 255 characters.")
        .custom(async (username) => {
            const user = await db.getUserByUsername(username);
            return !user;
        })
        .withMessage("Username is already taken."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long."),

    body("confirmPassword")
        .custom((value, { req }) => {
            return req.body.password === value;
        })
        .withMessage("Passwords do not match.")
];


userRouter.get('/sign-up', userController.getSignUp);
userRouter.post('/sign-up', validateUser, userController.createUser);

userRouter.get('/log-in', userController.getLogIn);
userRouter.post('/log-in', passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureMessage: true
}))

module.exports = userRouter;