const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const blogRoutes = require("./routes/blogRoutes");

const dbURI = "mongodb+srv://admin:root@cluster0.ilmdp.mongodb.net/test";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    // listen for requests

    app.listen(3000, () => {
      console.log("connection established");
    });
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// middleware & static files
app.use(express.static("public"));

// app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.use(blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "Super mario" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
