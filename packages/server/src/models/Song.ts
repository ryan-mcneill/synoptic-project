import mongoose, { Schema } from "mongoose";

const songSchema = new Schema({
  albums: [Schema.Types.ObjectId],
  artists: [Schema.Types.ObjectId],
  name: String,
  songPath: [String]
});

mongoose.model("songs", songSchema);

export { songSchema };
