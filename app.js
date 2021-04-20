const express = require("express");

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');npm

app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi ", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Mario", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Bowser", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
