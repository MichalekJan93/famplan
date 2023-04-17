// TODO
/* const express = require('express');
const model = require('../../models/labels');
const app = express();

app.get('/api/', (req, res) => {
    model.find({}, (err, result) => {
        if(err){
            return res.json({
                msg:"Failed to retrieve any data from the database",
                documents:[]
            })
        } else{
            return res.json({
                msg:"Successfully retrieved data from the database",
                documents:result
            })
        }
    })
});

module.exports = app; */