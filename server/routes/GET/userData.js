const express = require('express');
const model = require('../../models/userData');
const app = express();

app.get('/api/userData', (req, res) => {
  const id = req.session.userID;
  console.log("", id);
  model.findOne({userID: id})
    .then(user => {
      res.send(user);
    })
    .catch(() => {res.status(404).send("Failed to retrieve any data from the database")})
});

module.exports = app;