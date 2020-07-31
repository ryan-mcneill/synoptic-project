import { fetchAlbums } from "./albumsActions";
import { fetchArtists } from "./artistsActions";
import {
  setPlaylist,
  playlistAdd,
  playlistRemove,
  updatePlaylist
} from "./playlistActions";
import {
  setBackground,
  togglePlaying,
  getBackground,
  nextSong,
  prevSong,
  shuffleSongs
} from "./currentSongActions";
import { setIsOpen, setSelectedTab } from "./menuActions";
import { addToPlaylist, fetchPlaylists } from "./playlistsActions";
import { fetchSongs } from "./songsActions";
import { setTimedOut } from "./timedOutActions";

export {
  fetchSongs,
  fetchAlbums,
  fetchArtists,
  setBackground,
  togglePlaying,
  getBackground,
  setIsOpen,
  setSelectedTab,
  setPlaylist,
  playlistAdd,
  playlistRemove,
  nextSong,
  prevSong,
  shuffleSongs,
  updatePlaylist,
  fetchPlaylists,
  addToPlaylist,
  setTimedOut
};
