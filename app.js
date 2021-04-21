const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();
const app = express();

//Different middlewares to ensure 
//proper functioning of the app
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//MongoDB Atlas Connection URI
const uri = process.env.URI;

//Conncetion to the DB
//at above URI using mongoose
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database Connected.`));

//Setting up server on a PORT to 
//listen and respond to incomming requests
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server up on port ${PORT}...`)
);

//api endpoint with url => "/"
app.get("/", async (req, res) => {
    res.status(200).send("Working Fine");
});

module.exports = server;