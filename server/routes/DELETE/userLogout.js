const express = require('express');
const session = require('express-session');
const app  = require('../../server');

app.delete("/api/auth", (req, res) => {
    req.session.destroy((err) => {
        if (err){
            res.status(500).send({logOut: true, msg: "An error occurred when deleting a session"});
            return;
        }
    res.send({logOut: true, msg: "User logged out"});
    })
})

module.exports = app;