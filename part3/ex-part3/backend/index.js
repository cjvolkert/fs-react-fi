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

app.get("/api/notes/:id", (req, response, next) => {
  console.log(req.params.id);
  let id2 = new mongoose.Types.ObjectId(req.params.id);
  console.log(id2);

  Note.findById(id2)
    .then((notes) => {
      if (notes) {
        return response.json(notes);
      } else {
        return response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res, next) => {
  let id2 = new mongoose.Types.ObjectId(req.params.id);
  Note.findByIdAndDelete(id2)
    .then((e) => {
      console.log(`deleted ${e}`);
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/notes/", (request, response, next) => {
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

  note
    .save()
    .then((savedNote) => {
      console.log("saved!");
      response.json(savedNote);
    })
    .catch((err) => next(err));
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  let id = new mongoose.Types.ObjectId(request.params.id);

  if (!content) {
    return response.status(400).json({
      error: "no content for update",
    });
  }

  Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((savedNote) => {
      console.log("saved!");
      response.json(savedNote);
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
