const express = require('express');
const model = require('../../models/userData');
const app = express();
const session = require('express-session');

app.use(session({
  secret: "a/#$sd#0$",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  }
}));

app.get('/api/userData/', (req, res) => {
  const id = req.session.userID;
  model.findOne({userID: id})
    .then(user => {
      res.send(user);
    })
    .catch(() => {res.status(404).send("Failed to retrieve any data from the database")})
});

module.exports = app;