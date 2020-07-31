import { combineReducers } from "redux";

import { albums } from "./albumsReducers";
import { artists } from "./artistsReducers";
import { currentSong } from "./currentSongReducers";
import { menu } from "./menuReducers";
import { playlist } from "./playlistReducers";
import { playlists } from "./playlistsReducers";
import { songs } from "./songsReducers";
import { timedOut } from "./timedOutReducers";

export default combineReducers({
  albums,
  artists,
  currentSong,
  menu,
  playlist,
  playlists,
  songs,
  timedOut
});
