const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new mongoose.Schema({
    role: String,
    userID: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
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
            wDate: {
                type: Date,
                default: Date.now
            }
        })
    },
    events: {
        type: Map,
        of: new Schema({
            title: String,
            description: String,
            date: Date,
            startTime: String,
            endTime: String,
            location: String,
            private: Boolean,
            participants: [String],
            wDate: {
                type: Date,
                default: Date.now
            }
        })
    },
    wDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("usdts", userData);