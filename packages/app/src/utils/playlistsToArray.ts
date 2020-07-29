import { ArtistsAndAlbumsData } from "../store/types";

export const playlistsToArray = (playlists: ArtistsAndAlbumsData) =>
  Object.keys(playlists).map((id) => ({ id, name: playlists[id].name }));
