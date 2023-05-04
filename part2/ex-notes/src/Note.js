export const Note = ({ note }) => (
  <li> {note.content + (note.important ? " (i)" : "")} </li>
);
