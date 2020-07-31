import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

require("./models/Song");
require("./models/Artist");
require("./models/Album");
require("./models/Playlist");

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI || `mongodb://localhost:27017/musicplayer`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connection to the database established.");
  });

app.use(bodyParser.json());
app.use(cors());

require("./routes/albumRoutes")(app);
require("./routes/artistRoutes")(app);
require("./routes/songRoutes")(app);
require("./routes/playlistRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, "packages", "app", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server launched, running on port ${PORT}.`);
});
