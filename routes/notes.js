/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/26
*/

const notes = require('express').Router();

notes.get('/', (req, res) =>
{
  notes.get('/', (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));
});

module.exports = notes;