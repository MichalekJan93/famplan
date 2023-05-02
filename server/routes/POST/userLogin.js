const express = require('express');
const Joi = require('joi');
const model = require('../../models/userRegistration');
const modelUserData = require('../../models/userData');
const app = express();
const bcrypt = require("bcrypt");

function validate(data) {
    const schema = Joi.object({
        email: Joi.string(),
        password: Joi.string()
    });

    return schema.validate(data, { presence: "required" });
}

/**
 * Function for verify login password
 * @param {string} passwordHash Hash password from database
 * @param {string} password 
 * @returns boolean
 */
function verifyPassword(passwordHash, password) {
    return bcrypt.compareSync(password, passwordHash);
}

/**
 * The function returns data about the logged-in user
 * @param {*} sessionData TODO
 * @returns {object} The function returns a new object created by the object sessionData.
 */
function getPublicSessionData(sessionData) {
    const allowedKeys = ["_id", "email"];
    const entries = allowedKeys.map(key => [key, sessionData[key]]);
    return Object.fromEntries(entries);
}

app.post("/api/auth", (req, res) => {
    const loginData = req.body;
    const {error} = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    model.findOne({email: loginData.email})
        .then(user => {
            if (!user || !verifyPassword(user.passwordHash, loginData.password)) {
                res.send({"verify" : "-1"});
                return;
            }
            const sessionUser = user.toObject();
            delete sessionUser.passwordHash;
            req.session.user = sessionUser;
            req.session.save((err) => {
                if (err) {
                    res.status(500).send("There was an error when logging in");
                    return;
                }
                modelUserData.findOne({email: sessionUser.email})
                    .then(user => {
                        res.send(user);
                    })
            });
        })
        .catch(() => res.status(500).send("An error occurred while searching for a user"));
});

module.exports = app;