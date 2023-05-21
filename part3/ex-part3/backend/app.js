const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const config = require("./utils/config");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("error", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

const notesRouter = require("./controllers/notes");
app.use("/api/notes", notesRouter);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
