const express = require("express");
const router = express.Router();

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");

// GET '/myprofile'
router.get("/myprofile", isLoggedIn(), (req, res, next) => {
  res.status(200).json({ message: "You are on your profile!" });
});

// GET '/videogames'
router.get("/videogames", isLoggedIn(), (req, res, next) => {
  res.status(200).json({ message: "You are on the videogames page!" });
});

module.exports = router;
