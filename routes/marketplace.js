const express = require("express");
const router = express.Router();
const GamesToSell = require("../models/gamesToSell.js");

//Change the status to "Booked"
router.post("/marketplace/status", (req, res, next) => {
  const { id, status } = req.body;
  console.log(req.body);
  GamesToSell.findByIdAndUpdate(id, { $set: { status: status } })
    .then((data) => res.json(data).status(200))
    .catch((err) => console.log(err));
});

module.exports = router;
