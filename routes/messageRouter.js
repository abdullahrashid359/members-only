const { body } = require('express-validator');
const { Router } = require('express');
const messageController = require('../controllers/messageController');
const isAuthenticated = require('../middleware/authMiddleware');

const messageRouter = Router();

const validateMessage = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ max: 100 })
        .withMessage("Title must not exceed 100 characters."),

    body("text")
        .trim()
        .notEmpty()
        .withMessage("Message is required.")
];

messageRouter.get('/messages/new', isAuthenticated, messageController.getNewMessage);
messageRouter.post('/messages/new', isAuthenticated, validateMessage, messageController.createMessage);

module.exports = messageRouter;