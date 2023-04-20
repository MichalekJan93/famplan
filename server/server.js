const API_PORT = 5000;
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const getLabels = require('./routes/GET/labels');
const postUserRegistration = require('./routes/POST/userRegistration');
const cors = require('cors');

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/", getLabels);
app.use("/",postUserRegistration);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT} ...`));

mongoose
    .connect(process.env.DB_CONNECT, {useNewUrlParser: true})
    .then(() => console.log("Connect with database"))
    .catch(error => console.error("Connect failed...", error));