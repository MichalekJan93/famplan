const mongoose = require('mongoose');

const labelsSchema = new mongoose.Schema({
    code: Number,
    text: String,
    language: String,
    addUser: String,
    wDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("labels", labelsSchema);