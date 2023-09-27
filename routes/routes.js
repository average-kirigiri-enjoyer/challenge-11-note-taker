/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/27
*/

//imports express
const express = require("express");

//imports notes.js file
const notes = require("./notes.js");

//initializes express app
const app = express();

//routes requests beginning with "/notes" (relative) to the notes.js file
app.use("/notes", notes);

//exports app routing to be used in other files
module.exports = app;