const express = require('express');
const model = require('../../models/userData');
const app = express();

app.get('/api/userData/:id', (req, res) => {
    const id = String(req.params.id);
    model.findById(id, (err, result) => {
        if (err || !result) {
        res.status(404).send("Failed to retrieve any data from the database");
        }
        else
        res.json(result);
    });
  });

module.exports = app;