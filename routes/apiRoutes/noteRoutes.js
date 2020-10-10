const router = require('express').Router();
const unique_id_key = require('unique-id-key');

const { findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
let { notes } = require('../../db/db');

// Get all notes
router.get('/notes', (req, res) => {
  res.json(notes);
});

// Create a new note
router.post('/notes', (req, res) => {
  // set id based on milliseconds since Epoch
  req.body.id = unique_id_key.AlphaNum(16);

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// Delete an existing note
router.delete('/notes/:id', function (req, res) {
  const id = req.params.id;
  
  // if any note ID is not found, send 404 error back
  if (!findById(id, notes)) {
    res.status(404).send('That note is not found.');
  } else {
    notes = deleteNote(id, notes);
    res.json(`{"msg": "note ${id} deleted"}`);
  }
})

module.exports = router;