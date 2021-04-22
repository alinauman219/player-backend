const express = require("express");
const mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();
const app = express();
const { Player } = require("./player");

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

//api endpoint to get all players 
app.get("/", async (req, res) => {
    const players = await Player.find();
    res.status(200).send(players);
});

//api endpoint to create new player
app.post("/", async (req, res) => {

    let player = new Player({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        number: req.body.number,
        username: req.body.username,
    });
    player = await player.save();

    res.send(player);
});

//api endpoint to delete a player
app.delete("/:id", async (req, res) => {
    await Player.deleteOne({ _id: req.params.id });

    res.status(200).send(req.params.id);
});

//api endpoint to get a player by id
app.get("/:id", async (req, res) => {
    let player = await Player.findById(req.params.id);

    res.status(200).send(player);
});

mongoose.set('useFindAndModify', false);
//api endpoint to find a player by id and update
app.put("/:id", async (req, res) => {
    let player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        number: req.body.number,
        username: req.body.username,
    };
    
    player = await Player.findOneAndUpdate({ _id: req.params.id }, player, { new: true });

    res.status(200).send(player);
});

module.exports = server;