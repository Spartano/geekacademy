const express = require("express");
const morgan = require("morgan");
const app = express();
const blogRoutes = require("./routes/blogRoutes");
const timeStampRoutes = require("./routes/timestamp");
const whoamiRoutes = require("./routes/whoami");
const shortlinkRoutes = require("./routes/shortlink");

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
app.use(timeStampRoutes);
app.use(whoamiRoutes);
app.use(shortlinkRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "Super mario" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = app;
