const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.use(express.json());

app.get("/", (req, response) => {
  response.end("<h1>hello </h1>");
});
app.get("/api/notes", (req, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (req, response) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) response.json(note);
  else response.status(404).end();
});

app.delete("/api/notes/:id", (req, response) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const generatedId = () =>
  (notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0) + 1;

app.post("/api/notes/", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return respons.status(400).json({
      error: "no content",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generatedId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
