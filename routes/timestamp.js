const express = require("express");
const router = express.Router();

// Your first API endpoint
router.get("/api/whoami", function (req, res) {
  const { ["user-agent"]: userAgent } = req.headers;

  res.json({ user: userAgent });
});

module.exports = router;
