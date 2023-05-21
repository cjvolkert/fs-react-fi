const notesRouter = require("express").Router();
const mongoose = require("mongoose");
const Note = require("../models/note");

// notesRouter.get("/", (req, response) => {
//   response.end("<h1>hello </h1>");
// });

notesRouter.get("/", (req, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

notesRouter.get("/:id", (req, response, next) => {
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

notesRouter.delete("/:id", (req, res, next) => {
  let id2 = new mongoose.Types.ObjectId(req.params.id);
  Note.findByIdAndDelete(id2)
    .then((e) => {
      console.log(`deleted ${e}`);
      res.status(204).end();
    })
    .catch((err) => next(err));
});

notesRouter.post("/", (request, response, next) => {
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

notesRouter.put("/:id", (request, response, next) => {
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

module.exports = notesRouter;
