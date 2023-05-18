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
  const id2 = new mongoose.Types.ObjectId(req.params.id);
  Phonebook.findById(id2).then((e) => res.json(e));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((d) => d.id !== id);
  res.status(202).end();
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json({ error: "no content" });
  }
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!body.phone) {
    return res.status(400).json({ error: "number missing" });
  }
  Phonebook.find().then((data) => {
    if (data.some((n) => n.name === body.name)) {
      return res.status(400).json({
        error: "duplicat name",
      });
    }

    const entry = Phonebook({
      name: body.name,
      number: body.phone,
    });

    entry.save().then((e) => {
      console.log(`saved  ${e}!`);
      res.json(e);
    });
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
