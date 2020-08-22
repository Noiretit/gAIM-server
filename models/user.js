const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    picture: String,
    favoriteVideogames: [{
      type: String,
      enum: ['to play', 'playing', 'beaten', 'dropped'],
      default: 'to play',
    }],
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "GamesToSell",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
