/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/26
*/

const express = require("express");

const notes = require("./notes.js");

const app = express();

app.use("/notes", notes);

module.exports = app;