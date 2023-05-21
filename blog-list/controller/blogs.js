const blogRouter = require("express").Router();
// const mongoose = require("mongoose");

const Blog = require("../models/blog");

blogRouter.get("/blogs", async (request, response) => {
  let blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  let result = await blog.save();
  response.status(201).json(result);
});


blogRouter.post("/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  let result = await blog.save();
  response.status(201).json(result);
 });


module.exports = blogRouter;
