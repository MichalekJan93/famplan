const mongoose = require('mongoose');


const userRegistration = new mongoose.Schema({
    email: {type: String, index: {unique: true}},
    passwordHash: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("usrgs", userRegistration);