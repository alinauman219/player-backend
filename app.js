const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const uri = process.env.URI;

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database Connected.`));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server up on port ${PORT}...`)
);

app.get("/", async (req, res) => {
    res.status(200).send("Working Fine");
});

module.exports = server;