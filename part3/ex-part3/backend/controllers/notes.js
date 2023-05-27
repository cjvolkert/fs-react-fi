const notesRouter = require("express").Router();
const mongoose = require("mongoose");
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// notesRouter.get("/", (req, response) => {
//   response.end("<h1>hello </h1>");
// });

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
};

notesRouter.get("/", async (req, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (req, response) => {
  console.log(req.params.id);
  let id2 = new mongoose.Types.ObjectId(req.params.id);
  console.log(id2);

  const note = await Note.findById(id2);
  if (note) {
    return response.json(note);
  } else {
    return response.status(404).end();
  }
});

notesRouter.delete("/:id", async (req, res) => {
  let id2 = new mongoose.Types.ObjectId(req.params.id);
  const note = await Note.findByIdAndDelete(id2);
  console.log(`deleted ${note}`);
  res.status(204).end();
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "no content",
    });
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  console.log("saved!");
  response.json(savedNote);
});

notesRouter.put("/:id", async (request, response) => {
  const { content, important } = request.body;

  let id = new mongoose.Types.ObjectId(request.params.id);

  if (!content) {
    return response.status(400).json({
      error: "no content for update",
    });
  }

  const savedNote = await Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  );
  console.log("saved!");
  response.json(savedNote);
});

module.exports = notesRouter;
