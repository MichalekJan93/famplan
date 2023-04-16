const mongoose = require('mongoose');

const languagesSchema = new mongoose.Schema({
    code: Number,
    text: String,
    language: String,
    addUser: String,
    date: {
        type: Date,
        default: Date.now
    }
})