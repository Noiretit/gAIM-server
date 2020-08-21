const express = require("express");
const router = express.Router();

// GET '/marketplace'
router.get("/marketplace", isLoggedIn(), (req, res, next) => {
  res.status(200).json({ message: "You are on the marketplace page!" });
});

module.exports = router;
