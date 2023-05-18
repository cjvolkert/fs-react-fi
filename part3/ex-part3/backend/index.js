require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get("/", (req, response) => {
  response.end("<h1>hello </h1>");
});

app.get("/api/notes", (req, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

app.get("/api/notes/:id", (req, response) => {
  console.log(req.params.id);
  const id = Number(req.params.id);
  let id2 = new mongoose.Types.ObjectId(req.params.id);
  console.log(id2);

  Note.findById(id2).then((notes) => response.json(notes));
});

app.delete("/api/notes/:id", (req, response) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes/", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "no content",
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    console.log("saved!");
    response.json(savedNote);
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
