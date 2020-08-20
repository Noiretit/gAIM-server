const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    review: String,
    videogameId: String,
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
