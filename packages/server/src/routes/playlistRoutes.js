const mongoose = require("mongoose");
const Playlist = mongoose.model("playlists");

module.exports = (app) => {
  app.get(`/api/playlists`, async (req, res) => {
    let playlists = await Playlist.find();

    return res.status(200).send(playlists);
  });

  app.post(`/api/playlist/:id`, async (req, res) => {
    const { id } = req.params;
    const { name, songs } = req.body;

    if (id === "create") {
      const playlistAlreadyExits = await Playlist.find({ name });

      if (playlistAlreadyExits.length < 1) {
        const newPlaylist = new Playlist({
          name,
          songs
        });
        newPlaylist
          .save()
          .then((playlist) => res.status(201).send(playlist))
          .catch(() =>
            res.status(400).send({
              error: {
                message:
                  "There was an error saving your playlist. Please try again later."
              }
            })
          );
      } else {
        return res.status(400).send({
          error: { message: "A playlist with that name already exists." }
        });
      }
    } else {
      Playlist.findByIdAndUpdate(
        id,
        {
          name,
          songs
        },
        { useFindAndModify: false }
      )
        .then((playlist) => res.status(204).send(playlist))
        .catch(() =>
          res.status(400).send({
            error: {
              message:
                "There was an error updating your playlist. Please try again later."
            }
          })
        );
    }
  });
};
