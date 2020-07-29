const mongoose = require("mongoose");
const path = require("path");
const Song = mongoose.model("songs");
const Artist = mongoose.model("artists");
const Album = mongoose.model("albums");
const Playlist = mongoose.model("playlists");

module.exports = (app) => {
  app.get(`/api/song/:id`, async (req, res) => {
    const { id } = req.params;

    let song = await Song.findById(id);

    return res.status(200).sendFile(path.join(process.cwd(), ...song.songPath));
  });

  app.get(`/api/songs/:type/:id`, async (req, res) => {
    const { id, type } = req.params;
    let songs;

    if (type === "album" || type === "artist") {
      songs = await Song.find();

      songs = songs.reduce((acc, curr) => {
        if (curr[`${type}s`].includes(id)) acc.push(curr);
        return acc;
      }, []);
    } else if (type === "playlist") {
      let playlist = await Playlist.findById(id);
      songs = [];

      for (let i = 0; i < playlist.songs.length; i++) {
        const songId = playlist.songs[i];
        let song = await Song.findById({ _id: songId });
        songs = songs.concat(song);
      }
    } else if (type === "all") {
      songs = await Song.find();
      songs = songs.sort((a, b) => a.name.localeCompare(b.name));
    }

    const getArtistDetails = async () => {
      let details = {};
      let fetchedData = {};

      for (let i = 0; i < songs.length; i++) {
        const songId = songs[i]._id;
        details = { ...details, [songId]: [] };

        for (let j = 0; j < songs[i].artists.length; j++) {
          const id = songs[i].artists[j];
          let data;

          if (!fetchedData[id]) {
            data = await Artist.findById(songs[i].artists[j]);
            const { _id, name } = data;

            details[songId].push({ _id, name });
            fetchedData = { ...fetchedData, [id]: { _id, name } };
          } else {
            details[songId].push(fetchedData[id]);
          }
        }
      }
      return details;
    };

    const getAlbumDetails = async () => {
      let details = {};
      let fetchedData = {};

      for (let i = 0; i < songs.length; i++) {
        const songId = songs[i]._id;
        const albumId = type === "album" ? id : songs[i].albums[0];
        details = { ...details, [songId]: [] };
        let data;

        if (!fetchedData[id]) {
          data = await Album.findById(albumId);
          const { _id, name } = data;

          details[songId].push({ _id, name });
          fetchedData = { ...fetchedData, [albumId]: { _id, name } };
        } else {
          details[songId].push(fetchedData[albumId]);
        }
      }
      return details;
    };

    Promise.all([getArtistDetails(), getAlbumDetails()])
      .then((values) => {
        const artists = values[0];
        const albums = values[1];

        const songsWithDetails = songs.map(({ _id, name }) => ({
          _id,
          name,
          artists: artists[_id],
          albums: albums[_id]
        }));

        return res.status(200).send(songsWithDetails);
      })
      .catch((error) => {
        return res.status(500).send(error.message);
      });
  });
};
