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
                res.send({"verify" : -1, "msg" : "Invalid login details"});
                return;
            }
            const sessionUser = user.toObject();
            delete sessionUser.passwordHash;
            req.session.user = sessionUser;
            req.session.userID = sessionUser._id;
            req.session.save((err) => {
                if (err) {
                    res.status(500).send({"verify" : -1, "msg" : "There was an error when logging in"});
                    return;
                }
                res.send({"verify" : 1})
            });
        })
        .catch(() => res.status(500).send({"verify" : -1, "msg" : "An error occurred while searching for a user"}));
});

module.exports = app;