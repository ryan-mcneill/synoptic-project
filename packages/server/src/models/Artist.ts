import mongoose, { Schema } from "mongoose";

const artistSchema = new Schema({
  name: String
});

mongoose.model("artists", artistSchema);

export { artistSchema };
