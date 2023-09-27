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

notes.get('/', (req, res) =>
{
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) =>
    {
      if (err)
      {
        res.error(err);
      }
      else
      {
        res.json(data);
      }
    });
});

//handler for POST requests to the /notes page
notes.post('/', (req, res) =>
{
  if (req.body) //checks if the request body exists
  {
    const {title, text} = req.body; //deconstructs note properties from front-end request
    const noteData = //creates new note object with above data, plus a unique note ID
    {
      title: title,
      text: text,
      id: uuid(),
    };

    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) =>
    {
      if (err)
      {
        res.error(err);
      }
      else
      {
        let existingNotes = JSON.parse(data);
        existingNotes.push(noteData);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(existingNotes, null, 4),
          (writeErr) => writeErr
          ? console.error(writeErr)
          : console.info('successfully updated notes'));
      }

      res.json(noteData);
    });
  }
  else //if the request body does not exist, reject the promise
  {
    res.error('error receiving note data');
  }
});

//handler for POST requests to the /notes page
notes.delete('/:id', (req, res) =>
{
  const deleteNoteID = req.params.id;

  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) =>
  {
    if (err)
    {
      res.error(err);
    }
    else
    {
      let existingNotes = JSON.parse(data);
      const deleteNoteIndex = existingNotes.findIndex(note => note.id === deleteNoteID); //retrieves index of note to delete via the given id
      existingNotes.splice(deleteNoteIndex, 1); //removes note from appropriate index

      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(existingNotes, null, 4),
        (writeErr) => writeErr
        ? console.error(writeErr)
        : console.info('successfully updated notes'));

      res.json(existingNotes);
    }

    
  });
});

module.exports = notes;