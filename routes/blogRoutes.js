const express = require("express");
const router = express.Router();
const { randomBytes } = require("crypto");
const _ = require("lodash");

const blogs = [];

router.get("/blogs", (req, res) => {
  res.render("index", {
    title: "super mario",
    blogs,
  });
});

router.post("/blogs", (req, res) => {
  const data = req.body;

  data.id = randomBytes(4).toString("hex");
  blogs.push(data);

  res.redirect("/blogs");
});

router.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Super mario" });
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
