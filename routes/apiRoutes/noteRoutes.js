const { findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db');
const router = require('express').Router();

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.post('/notes', (req, res) => {
  // set id based on milliseconds since Epoch
  req.body.id = new Date().getTime();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;