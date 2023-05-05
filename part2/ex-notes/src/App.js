import { Note } from "./Note";
import { useState, useEffect } from "react";

//import { getAll, create, update } from "./services/notes";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("...note");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  };

  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    const newNotex = {
      content: newNote,
      id: notes.length + 1,
      important: Math.random() > 0.5,
    };
    console.log(newNote);

    noteService
      .create(newNotex)
      .then((resp) => {
        setNotes(notes.concat([resp]));
        setNewNote("");
      })
      .catch((e) => alert(e));
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
    };

    console.log("importance of " + id + " needs to be toggled");
    noteService
      .update(changedNote.id, changedNote)
      .then((r) => setNotes(notes.map((n) => (n.id !== id ? n : r))));
  };

  console.log(notes.length);
  return (
    <div>
      <h1>Notes</h1>
      <button type="submit" onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>

      <ul>
        {notes
          .filter((n) => n.important || showAll)
          .map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
