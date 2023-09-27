/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/26
Last Edited 2023/09/27
*/

//imports libraries & packages
const notes = require("express").Router();
const path = require('path');
const fs = require("fs");
const uuid = require("../helpers/uuid.js");

//upon receiving a GET request, the notes page will respond with JSON data of all existing notes if it does not encounter an error
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

//upon receiving a POST request, the notes page will attempt to add a new note to the database
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

    //attempts to read note data from server database
    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) =>
    {
      if (err) //if an error was encountered, reject the promise
      {
        res.error(err);
      }
      else //if the data was successfully retrieved, append the new note to the array, and re-write the database with the new note added
      {
        let existingNotes = JSON.parse(data);
        existingNotes.push(noteData);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(existingNotes, null, 4),
          (writeErr) => writeErr
          ? console.error(writeErr)
          : console.info('successfully updated notes'));

        res.json(noteData); //resolve the promise with the new note's data
      }
    });
  }
  else //if the request body does not exist, reject the promise
  {
    res.error('error receiving note data');
  }
});

//upon receiving a DELETE request, attempts to remove the note with the appropriate ID from the server's database
notes.delete('/:id', (req, res) =>
{
  const deleteNoteID = req.params.id; //retrieves ID of note to delete from request parameter

  //attempts to read note data from server database
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) =>
  {
    if (err) //if an error was encountered, reject the promise
    {
      res.error(err);
    }
    else //if the data was successfully retrieved, find the index of the note with an ID matching that of the delete request
    {
      let existingNotes = JSON.parse(data);
      const deleteNoteIndex = existingNotes.findIndex(note => note.id === deleteNoteID); //retrieves index of note to delete via the given id
      existingNotes.splice(deleteNoteIndex, 1); //removes note from appropriate index

      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(existingNotes, null, 4),
        (writeErr) => writeErr
        ? console.error(writeErr)
        : console.info('successfully updated notes'));

      res.json(existingNotes); //resolves the promise with all existing note data
    }
  });
});

//exports notes functionality to be used in other files
module.exports = notes;