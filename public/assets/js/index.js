/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 11 Weekly Challenge - Note Taker
Created 2023/09/24
Last Edited 2023/09/27
*/

//defines variables to hold values relevant for note taking
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

//if the window is on the notes page, get references to the appropriate elements of the notes page
if (window.location.pathname === '/notes')
{
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) =>
{
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) =>
{
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

//function to retrieve note data, before passing it to another function to render the data to the notes column
const getNotes = () =>
  fetch('/api/notes',
  {
    method: 'GET',
    headers: 
    {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => renderNoteList(JSON.parse(data)));

//function to save a newly-created note to the server's database
const saveNote = (note) =>
  fetch('/api/notes',
  {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(note),
  })
  .catch((error) => console.error('Error:', error));

//function to delete a note from the server's database
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`,
  {
    method: 'DELETE',
    headers:
    {
      'Content-Type': 'application/json',
    },
  })
  .catch((error) => console.error('Error:', error));

//function to render data regarding the active note in the note creation panel
const renderActiveNote = () =>
{
  hide(saveNoteBtn);

  if (activeNote.id)
  {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } 
  else
  {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

//function to process a newly-created note's data before passing it off to another function which sends that data to the server
const handleNoteSave = () =>
{
  const newNote =
  {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() =>
  {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = async (e) =>
{
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId)
  {
    activeNote = {};
  }

  await deleteNote(noteId);

  getAndRenderNotes();
  renderActiveNote();
};

// Sets the activeNote and displays it
const handleNoteView = (e) =>
{
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) =>
{
  activeNote = {};
  renderActiveNote();
};

//function which hides the 'save' button for notes if there are no non-whitespace characters in either the note's title or text field
const handleRenderSaveBtn = () =>
{
  if (!noteTitle.value.trim() || !noteText.value.trim())
  {
    hide(saveNoteBtn);
  }
  else
  {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) =>
{
  let jsonNotes = notes;
  if (window.location.pathname === '/notes')
  {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) =>
  {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn)
    {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0)
  {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) =>
  {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes')
  {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes();

if (window.location.pathname === '/notes')
{
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();