const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const config = require("./utils/config");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URL)
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

const blogsRouter = require("./controller/blogs");
app.use("/api", blogsRouter);

const userRouter = require("./controller/users");
app.use("/api/user", userRouter);

const loginRouter = require("./controller/login");
app.use("/api/login", loginRouter);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
