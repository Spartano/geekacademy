const express = require("express");
const morgan = require("morgan");
const app = express();
const blogRoutes = require("./routes/blogRoutes");

app.listen(3000, () => {
  console.log("sto girando sulla porta 3000");
});

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

const clienti = [1, 2, 3];

app.get("/customers", (req, res) => {
  res.json({ clienti });
});

app.post("/customers", (req, res) => {
  const data = req.body;
  clienti.push(data);

  res.json({ clienti });
});

app.delete("/customers/:id", (req, res) => {
  const data = req.params.id;
  clienti.push(data);

  res.json({ clienti });
});

app.use(blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "Super mario" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
