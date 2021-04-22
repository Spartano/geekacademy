const express = require("express");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");
var mongoose = require("mongoose");
// express app
const app = express();

// connect to mongodb & listen for requests
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
app.use(blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
