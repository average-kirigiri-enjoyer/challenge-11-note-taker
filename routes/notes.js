/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/26
*/
const notes = require("express").Router();
const path = require('path');
const fs = require("fs");
const uuid = require("../helpers/uuid.js");

/*notes.get('/', (req, res) =>
{
  console.log(`get notes successful`);
  res.json(`get notes successful`);
});*/

notes.post('/', (req, res) =>
{
  if (req.body)
  {
    //review_id: uuid()
    
    console.log(`post notes successful`);
    noteData = req.body;
    console.log(noteData);
    res.json(`post notes successful`);

    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) =>
    {
      if (err)
      {
        console.error(err);
      }
      else
      {
        let existingNotes = JSON.parse(data);
        console.log(existingNotes);
        existingNotes.push(noteData);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(existingNotes, null, 4),
          (writeErr) => writeErr
          ? console.error(writeErr)
          : console.info('successfully updated notes'));
      }
    });
  }
  else
  {
    res.error('error recieving note');
  }
});

module.exports = notes;