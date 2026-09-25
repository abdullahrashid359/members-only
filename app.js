const net = require("node:net");
net.setDefaultAutoSelectFamily(false);

if (process.env.NODE_ENV !== "production") {
    process.loadEnvFile(".env");
}

const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");

const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const messageRouter = require('./routes/messageRouter');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", messageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error)
        throw error;

    console.log(`Server listening on port ${PORT}`);
});