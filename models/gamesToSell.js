const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesToSellSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    platforms: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["selling", "booked", "sold"],
      default: "selling",
    },
    parentPlatforms: [
      {
        type: String,
        required: true,
      },
    ],
    childrenPlatform: {
      type: String,
      required: true,
    },
    users: {
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
