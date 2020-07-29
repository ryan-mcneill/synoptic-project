import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema({
  artists: [Schema.Types.ObjectId],
  artPath: [String],
  name: String
});

mongoose.model("albums", albumSchema);

export { albumSchema };
