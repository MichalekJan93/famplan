const express = require('express');
const app = express();
const session = require('express-session');

app.delete("/api/auth", (req, res) => {
    const id = req.session;
    console.log('userID', id);
    /* req.session.destroy((err) => {
        if (err){
            res.status(500).send({logOut: true, msg: "An error occurred when deleting a session"});
            return;
        }
    res.send({logOut: true, msg: "User logged out"});
    }) */
})

module.exports = app;