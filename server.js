/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/26
*/

//
const express = require("express");
const path = require('path');
const api = require("./routes/routes.js");

//creating new express instance & defining port
const app = express();
const PORT = process.env.PORT || 3001;

//importing & initializing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/api", api);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

app.listen(PORT, () =>console.log(`App deployed to localhost port ${PORT}!`));