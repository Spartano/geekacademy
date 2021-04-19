const express = require("express");
const morgan = require("morgan");
const _ = require("lodash");
const { randomBytes } = require("crypto");
// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

//si azzera ad ogni riavvio del server
const blogs = [];

app.get("/blogs", (req, res) => {
  res.render("index", { blogs, title: "All blogs" });
});

app.post("/blogs", (req, res) => {
  // console.log(req.body);
  const blog = req.body;

  blog.id = randomBytes(4).toString("hex");
  blogs.push(blog);

  res.redirect("/blogs");
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === id);

  res.render("details", { blog, title: "Blog Details" });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  _.remove(blogs, function (blog) {
    return blog.id === id;
  });

  res.json({ redirect: "/blogs" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
