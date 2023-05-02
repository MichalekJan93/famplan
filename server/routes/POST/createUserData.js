const express = require('express');
const Joi = require('joi');
const model = require('../../models/userData');
const app = express();

function validate(data) {
    const schema = Joi.object({
        userID: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      });

      return schema.validate(data, {presence: "required"});
}


app.post("/api/createUserData", (req, res) => {
    const userData = req.body;
    const {error} = validate({
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
        teamMembers: {},
        toDoTasks: {},
        events: {},
    }

    model.create(userCreateData)
        .then(savedData => {
            const result = savedData.toObject();
            res.send(result);
        })
        .catch(() => res.status(500).send("An error occurred while searching for a user"));
});

module.exports = app;