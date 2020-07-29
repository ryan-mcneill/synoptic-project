const mongoose = require("mongoose");
const path = require("path");
const Album = mongoose.model("albums");

module.exports = (app) => {
  app.get(`/api/albums`, async (req, res) => {
    let albums = await Album.find();

    albums = albums.reduce((acc, curr) => {
      acc.push(curr);
      return acc;
    }, []);

    return res.status(200).send(albums);
  });

  app.get(`/api/album/art/:id`, async (req, res) => {
    const { id } = req.params;

    let album = await Album.findById(id);

    return res.status(200).sendFile(path.join(process.cwd(), ...album.artPath));
  });
};
