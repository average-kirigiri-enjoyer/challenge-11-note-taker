/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/27
*/

//imports packages & libraries
const express = require("express");
const path = require('path');
const api = require("./routes/routes.js");

//creating new express instance & defining port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); //initializes application middleware to automatically parse incoming JSON data
app.use(express.urlencoded({extended: true})); //initializes application middleware to decode url-encoded data
app.use(express.static("public")); //sets application to serve static files from the "public" folder
app.use("/api", api); //initializes application middleware route requests beginning with "/api" (relative) to the routes.js file

//sets default path to serve the index.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//sets /notes path to serve the notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

//begins serving application at local host port specified by PORT variable
app.listen(PORT, () =>console.log(`App deployed to local host port ${PORT}`));