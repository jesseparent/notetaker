const fs = require("fs");
const { findById, createNewNote, validateNote, deleteNote } = require('../lib/notes');
const { notes } = require('../db/db');

jest.mock('fs');

test("creates a note", () => {
  const note = createNewNote({
    "title" : "Test Note",
    "text" : "test text"
  }, notes);

  expect(note.title).toBe("Test Note");
  expect(note.text).toBe("test text");
});

test("deletes a note", () => {
  let notesArray = [
    {
      "id" : 1,
      "title" : "Delete Me",
      "text" : "deleting"
    },
    {
      "id" : 2,
      "title" : "Keep Me",
      "text" : "keeping"
    }
  ];

  notesArray = deleteNote(1, notesArray);

  expect(notesArray.length).toEqual(1);
  expect(notesArray[0].id).toBe(2);
  expect(notesArray[0].title).toBe("Keep Me");
  expect(notesArray[0].text).toBe("keeping");
});

test("validates title", () => {
  const goodNote = {
    "id" : 1,
    "title" : "Title",
    "text" : "text"
  };

  const badNote = {
    "id" : 2,
    "title" : "Missing Text"
  };

  const goodResult = validateNote(goodNote);
  const badResult = validateNote(badNote);

  expect(goodResult).toBe(true);
  expect(badResult).toBe(false);
});

test("validates text", () => {
  const goodNote = {
    "id" : 1,
    "title" : "Title",
    "text" : "text"
  };

  const badNote = {
    "id" : 2,
    "text" : "Missing Title"
  };

  const goodResult = validateNote(goodNote);
  const badResult = validateNote(badNote);

  expect(goodResult).toBe(true);
  expect(badResult).toBe(false);
});

test("find a note by its id", () => {
  let notesArray = [
    {
      "id" : 1,
      "title" : "Note 1",
      "text" : "First note"
    },
    {
      "id" : 2,
      "title" : "Find Me",
      "text" : "Look for me"
    }
  ];

  const foundNote = findById(2, notesArray);
  const lostNote = findById(3, notesArray);

  expect(foundNote).toBe(notesArray[1]);
  expect(foundNote).toBeTruthy();
  expect(lostNote).toBeUndefined();
  expect(lostNote).toBeFalsy();
})