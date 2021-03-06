const express = require("express");
const router = express.Router();
const GamesToSell = require("../models/gamesToSell");

router.post("/offer", (req, res, next) => {
  const {
    price,
    childrenPlatform,
    videoGameId,
    videoGameName,
    videoGamePic,
    user,
  } = req.body;
  GamesToSell.create({
    price,
    childrenPlatform,
    videoGameId,
    videoGameName,
    videoGamePic,
    user,
  })
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(
      (err) => console.log("Error while creating an offer", err),
      res.status(500)
    );
});

//TO GET ONE OFFER
router.get("/offer", (req, res, next) => {
  GamesToSell.find({})
    .populate("user")
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
});
module.exports = router;

//TO DELETE ONE OFFER
router.post("/offer/delete", (req, res, next) => {
  const idOfTransaction = req.body.id;

  GamesToSell.deleteOne(
    {
      _id: idOfTransaction,
    },
    function (err) {
      if (err) console.log(err);
      console.log("Transaction successfully deleted");
    }
  )
    .then((data) => res.json(data).status(200))
    .catch((err) => console.log(err));
});

module.exports = router;
