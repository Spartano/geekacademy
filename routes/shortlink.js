const express = require("express");
const router = express.Router();
const { randomBytes } = require("crypto");

const urls = {};

router.post("/api/shorturl/new", function (req, res) {
  const { url } = req.body;

  // lo devo minificare
  const urlCode = randomBytes(4).toString("hex");

  // lo devo salvare associandolo pero al url iniziale
  urls[urlCode] = url;

  //devo ritornare al client il nuovo url

  res.json({ url: urlCode });
});

router.get("/api/shorturl/:urlCode", function (req, res) {
  const { urlCode } = req.params;

  res.json({ urlIniziale: urls[urlCode] });
});

module.exports = router;
