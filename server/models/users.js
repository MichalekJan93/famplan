const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    role: String,
    name: String,
    teamMembers: {
        type: Map,
        of: new Schema({
            id: String,
            role: String
        })
    },
    toDoTasks: {
        type: Map,
        of: new Schema({
            id: Number,
            name: String,
            active: Boolean,
            date: {
                type: Date,
                default: Date.now
            }
        })
    },
    Calendar: { //TODO

    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("labels", usersSchema);