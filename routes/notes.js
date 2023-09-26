/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/26
*/

//imports libraries & packages
const notes = require("express").Router();
const path = require('path');
const fs = require("fs");
const uuid = require("../helpers/uuid.js");

/*notes.get('/', (req, res) =>
{
  console.log(`get notes successful`);
  res.json(`get notes successful`);
});*/

//handler for POST requests to the /notes page
notes.post('/', (req, res) =>
{
  if (req.body) //checks if the request body exists
  {
    console.log(req.body);
    const {title, text} = req.body; //deconstructs note properties from front-end request
    const noteData = //creates new note object with above data, plus a unique note ID
    {
      noteTitle: title,
      noteText: text,
      noteID: uuid(),
    };

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
  else //if the request body does not exist, reject the promise
  {
    res.error('error receiving note data');
  }
});

module.exports = notes;