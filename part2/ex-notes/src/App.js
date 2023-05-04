import { Note } from "./Note";
import { useState } from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("...note");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const newNotex = {
      content: newNote,
      id: notes.length + 1,
      important: Math.random() > 0.5,
    };
    console.log(newNote);
    setNotes(notes.concat([newNotex]));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

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
            <Note key={note.id} note={note} />
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
