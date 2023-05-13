const express = require("express");
const morgan = require("morgan");

const app = express();

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  res.json(data);
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${data.length} people  <br/>  ${new Date()}`
  );
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const entry = data.filter((d) => d.id === id);
  if (entry) {
    res.json(entry);
  } else {
    res.status(404).end();
  }
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
    return res.status(400).json({
      error: "no content",
    });
  }

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }
  console.log(data.filter((n) => n.name === body.name));
  if (data.some((n) => n.name === body.name)) {
    return res.status(400).json({
      error: "duplicat name",
    });
  }

  const entry = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  };

  data = data.concat(entry);
  res.json(entry);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
