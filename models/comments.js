const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    review: {
      type: String,
      required: true,
    },
    videogameId: String,
    videogameName: String,
    rating: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
