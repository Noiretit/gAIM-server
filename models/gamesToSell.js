const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesToSellSchema = new Schema(
  {
    videoGameId: {
      type: String,
    },
    price: {
      type: String,
    },
    status: {
      type: String,
      enum: ["selling", "booked", "sold"],
      default: "selling",
    },
    childrenPlatform: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const GamesToSell = mongoose.model("GamesToSell", gamesToSellSchema);
module.exports = GamesToSell;
