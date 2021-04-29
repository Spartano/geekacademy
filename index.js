const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = require("./app");
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
