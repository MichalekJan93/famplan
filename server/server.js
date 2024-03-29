const API_PORT = 5000;
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const expressSession = require("express-session");
const cors = require('cors');
const bcrypt = require("bcrypt");
const fs = require("fs");
const insertImg = require("./function/insertImg");

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
app.use(cors({ 
    credentials: true, 
    origin: 'http://localhost:3000' 
}));

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT} ...`));

mongoose
    .connect(process.env.DB_CONNECT, {useNewUrlParser: true})
    .then(() => console.log("Connect with database"))
    .catch(error => console.error("Connect failed...", error));


const reqAuthHandler = require('./auth/reqAuthHandler');

/* ==================== MODELS ==================== */

const modelUserData = require('./models/userData');
const modelUserRegistration = require('./models/userRegistration');

/* ==================== JOI VALIDATIONS ==================== */

function userRegistrationValidate(data){
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(6)
    });

    return schema.validate(data, {presence: "required"});
}

function userLoginValidate(data) {
    const schema = Joi.object({
        email: Joi.string(),
        password: Joi.string()
    });

    return schema.validate(data, { presence: "required" });
}

function userCreatedValidate(data) {
    const schema = Joi.object({
        userID: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      });

      return schema.validate(data, {presence: "required"});
}

/* ==================== FUNCTIONS ==================== */

/**
 * Function for verify login password
 * @param {string} passwordHash Hash password from database
 * @param {string} password 
 * @returns boolean
 */
function verifyPassword(passwordHash, password) {
    return bcrypt.compareSync(password, passwordHash);
}

function hashPassword(password, saltRounds = 10) {
    return bcrypt.hashSync(password, saltRounds);
}

/* ==================== REQUESTS ==================== */

app.delete("/api/auth", (req, res) => {
    req.session.destroy((err) => {
        if (err){
            res.status(500).send({logOut: true, msg: "An error occurred when deleting a session"});
            return;
        }
    res.send({logOut: true, msg: "User logged out"});
    res.end();
    })
})

app.post("/api/auth", (req, res) => {
    const loginData = req.body;
    const {error} = userLoginValidate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    modelUserRegistration.findOne({email: loginData.email})
        .then(user => {
            if (!user || !verifyPassword(user.passwordHash, loginData.password)) {
                res.send({"verify" : -1, "msg" : "Invalid login details"});
                return;
            }
            const sessionUser = user.toObject();
            delete sessionUser.passwordHash;
            req.session.userID = sessionUser._id;
            req.session.save((err) => {
                if (err) {
                    res.status(500).send({"verify" : -1, "msg" : "There was an error when logging in"});
                    return;
                }
                res.send({"verify" : 1, "userID" : sessionUser._id})
            });
        })
        .catch(() => res.status(500).send({"verify" : -1, "msg" : "An error occurred while searching for a user"}));
});

app.post("/api/createUserData", (req, res) => {
    const userData = req.body;
    const {error} = userCreatedValidate({
        userID: req.body._id,
        name: req.body.email,
        email: req.body.email,
    });
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const userCreateData = {
        role: "Admin",
        userID: userData._id,
        name: userData.email,
        email: userData.email,
        icon: fs.readFileSync('../app/src/assets/images/userIcon/icon-user-fox.png'),
        teamMembers: {},
        toDoTasks: {},
        events: {},
    }

    modelUserData.create(userCreateData)
        .then(savedData => {
            const result = savedData.toObject();
            const folderName = './users/' + userData._id;
            try {
                if(!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                     res.send(result);
                }
            } catch (error) {
                res.status(500).send("An error occurred while searching for a user");
            }
        })
        .catch(() => res.status(500).send("An error occurred while searching for a user"));
});

app.post("/api/registrationUser", (req, res) => {
    const userData = req.body;
    const {error} = userRegistrationValidate(userData);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const createUser = {
        email: userData.email,
        passwordHash: hashPassword(userData.password),
    };

    modelUserRegistration.create(createUser)
        .then(savedUser => {
            const result = savedUser.toObject();
            delete result.passwordHash;
            req.session.userID = result._id;
            res.send(result);
        })
        .catch(error => {
            if (error.code === 11000) {
                res.status(409).send("An account with the specified email already exists");
                return;
            }
            res.status(500).send("An error occurred during registration");
        });
})

app.get('/api/userData', reqAuthHandler, (req, res) => {
    modelUserData.findOne({userID: req.session.userID})
        .then(user => {
        res.send(user);
        })
        .catch(() => {res.status(404).send("Failed to retrieve any data from the database")})
});