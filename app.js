const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("sto girando sulla porta 3000");
});

// register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "super mario",
    blogs: [
      {
        title: "Mario",
        snippet: "Il piu grande",
      },
      {
        title: "Luigi",
      },
    ],
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Super mario" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Super mario" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
