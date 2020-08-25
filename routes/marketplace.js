const express = require("express");
const router = express.Router();
const GamesToSell = require("../models/gamesToSell.js");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");

// GET '/marketplace'
router.get("/marketplace", isLoggedIn(), (req, res, next) => {
  res.status(200).json({ message: "You are on the marketplace page!" });
});

//Change the status to "Booked"
router.post("/marketplace/status", (req, res, next) => {
  const { id, status } = req.body;
  console.log(req.body);
  GamesToSell.findByIdAndUpdate(id, { $set: { status: status } })
    .then((data) => res.json(data).status(200))
    .catch((err) => console.log(err));
});

module.exports = router;
