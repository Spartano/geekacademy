const express = require("express");
const { randomBytes } = require("crypto");
const _ = require("lodash");
const Blog = require("../model/blog");

const router = express.Router();
const blogs = [];

router.get("/blogs/create", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//si azzera ad ogni riavvio del server

router.get("/blogs", (req, res) => {
  res.render("index", { blogs, title: "All blogs" });
});

router.post("/blogs", (req, res) => {
  // console.log(req.body);
  const blog = req.body;

  blog.id = randomBytes(4).toString("hex");
  blogs.push(blog);

  res.redirect("/blogs");
});

router.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === id);

  res.render("details", { blog, title: "Blog Details" });
});

router.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  _.remove(blogs, function (blog) {
    return blog.id === id;
  });

  res.json({ redirect: "/blogs" });
});

module.exports = router;
