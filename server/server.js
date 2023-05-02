const API_PORT = 5000;
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const postUserRegistration = require('./routes/POST/userRegistration');
const postCreateUserData = require('./routes/POST/createUserData');
const postUserLogin = require('./routes/POST/userLogin');
const expressSession = require("express-session");

const cors = require('cors');

require("dotenv").config();

app.use(express.json());
app.use(expressSession({
    secret: "a/#$sd#0$",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    }
}));
app.use(cors());
app.use("/", postUserRegistration);
app.use("/", postUserLogin);
app.use("/", postCreateUserData);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT} ...`));

mongoose
    .connect(process.env.DB_CONNECT, {useNewUrlParser: true})
    .then(() => console.log("Connect with database"))
    .catch(error => console.error("Connect failed...", error));