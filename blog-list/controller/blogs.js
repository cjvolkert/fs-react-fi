const blogRouter = require("express").Router();
// const mongoose = require("mongoose");

const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/blogs", async (request, response) => {
  let blogs = await Blog.find({}).populate("users", {
    user: 1,
    username: 1,
  });
  response.json(blogs);
});

blogRouter.post("/blogs", async (request, response) => {
  const blog = new Blog(request.body);

  const users = await User.find({ user: request.body.user });
  if (users.length === 0) {
    return response.status(404).json({ error: "user not found " });
  }

  const user = users[0];
  blog.users = blog.users.concat(user._id);

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  console.log(`user: ${user}`);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.post("/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  let result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogRouter;
