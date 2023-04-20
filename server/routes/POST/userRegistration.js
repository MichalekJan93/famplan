const express = require('express');
const Joi = require('joi');
const model = require('../../models/userRegistration');
const app = express();
const bcrypt = require("bcrypt");

function validate(data){
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(6)
    });

    return schema.validate(data, {presence: "required"});
}

function hashPassword(password, saltRounds = 10) {
    return bcrypt.hashSync(password, saltRounds);
}

app.post("/api/registrationUser", (req, res) => {
    const userData = req.body;
    const {error} = validate(userData);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const userCreateData = {
        email: userData.email,
        passwordHash: hashPassword(userData.password),
        isAdmin: false
    };

    model.create(userCreateData)
        .then(savedUser => {
            const result = savedUser.toObject();
            /* delete result.passwordHash; */
            res.send(result);
        })
        .catch(e => {
            if (e.code === 11000) { // pokud email v databázi již existuje
                res.status(400).send("Účet se zadaným emailem již existuje");
                return;
            }
            res.status(500).send("Nastala chyba při registraci");
        });
})

module.exports = app;