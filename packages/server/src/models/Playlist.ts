import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
  name: String,
  songs: [String]
});

mongoose.model("playlists", playlistSchema);

export { playlistSchema };
