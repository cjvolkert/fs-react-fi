const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, user, password } = request.body;

  if (password.length < 3) {
    return response.status(401).json({
      error: "invalid password length",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    user,
    passwordHash,
  });
  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
