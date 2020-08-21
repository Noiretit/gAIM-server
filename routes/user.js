const express = require("express");
const router = express.Router();

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");


// GET '/profile'
router.get("/profile", isLoggedIn(), (req, res, next) => {
  res.status(200).json({ message: "You are on your profile!" });
});


module.exports = router;