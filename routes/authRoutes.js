const express = require("express");
const User = require("../models/userModels");
const Verification = require("../models/verificationModels");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route works",
  });
});

module.exports = router;
