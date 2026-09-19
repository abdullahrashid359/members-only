const net = require("node:net");
net.setDefaultAutoSelectFamily(false);

if (process.env.NODE_ENV !== "production") {
    process.loadEnvFile(".env");
}

const path = require("node:path");
const express = require("express");

const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error)
        throw error;

    console.log(`Server listening on port ${PORT}`);
});