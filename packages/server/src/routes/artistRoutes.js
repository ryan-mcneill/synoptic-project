const mongoose = require("mongoose");
const Artist = mongoose.model("artists");

module.exports = (app) => {
  app.get(`/api/artists`, async (req, res) => {
    let artists = await Artist.find();

    artists = artists.reduce((acc, curr) => {
      acc.push(curr);
      return acc;
    }, []);

    return res.status(200).send(artists);
  });
};
