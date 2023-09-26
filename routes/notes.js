/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/26
*/

const notes = require('express').Router();

/*notes.get('/', (req, res) =>
{
  console.log(`get notes successful`);
  res.json(`get notes successful`);
});*/

notes.post('/', (req, res) =>
{
  if (req.body)
  {
    console.log(`post notes successful`);
    noteData = req.body;
    console.log(noteData);
    res.json(`post notes successful`);
  }
  else
  {
    res.error('error recieving note');
  }
});

module.exports = notes;