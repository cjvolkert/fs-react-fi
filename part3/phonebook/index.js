require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const Phonebook = require("./models/phonebook");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    const base = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ];
    if (req.method === "POST") {
      return base.concat([JSON.stringify(req.body)]).join(" ");
    } else {
      return base.join(" ");
    }
  })
);
app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  Phonebook.find().then((data) => res.json(data));
});

app.get("/info", (req, res) => {
  Phonebook.find().then((data) =>
    res.send(
      `Phonebook has info for ${data.length} people  <br/>  ${new Date()}`
    )
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  Phonebook.findById(id).then((e) => res.json(e));
});

app.delete("/api/persons/:id", (req, res) => {
  const id2 = new mongoose.Types.ObjectId(req.params.id);
  Phonebook.findByIdAndDelete(id2)
    .then((e) => res.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "no content" });
  }
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }

  const entry = {
    name: body.name,
    number: body.number,
  };
  Phonebook.findOne({ name: body.name }).then((n) => {
    if (n) {
      const existingId = n._id;
      console.log(`updating ${existingId}`);
      Phonebook.findByIdAndUpdate(existingId, entry, {}).then((savedNote) => {
        res.json(savedNote);
      });
    } else {
      Phonebook(entry)
        .save()
        .then((e) => {
          console.log(`saved  ${e}!`);
          res.json(e);
        });
    }
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
