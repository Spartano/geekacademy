const express = require("express");
const router = express.Router();

// Your first API endpoint
router.post("/api/timestamp/utc", function (req, res) {
  const { data } = req.body;

  res.json({ utc: new Date(data).toUTCString(), unix: new Date(data).getTime() });
});

router.post("/api/timestamp/unix", function (req, res) {
  const { data } = req.body;

  res.json({ utc: new Date(data).toUTCString(), unix: new Date(data).getTime() });
});

module.exports = router;
