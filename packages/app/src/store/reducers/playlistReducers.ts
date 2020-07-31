import {
  PLAYLIST_ADD,
  PlaylistActions,
  PlaylistState,
  SET_PLAYLIST,
  UPDATE_PLAYLIST
} from "../types";

const initialState: PlaylistState = {
  previous: [],
  next: []
};

export const playlist = (
  state: PlaylistState = initialState,
  action: PlaylistActions
) => {
  switch (action.type) {
    case SET_PLAYLIST:
      return {
        previous: [],
        current: action.payload.firstSong,
        next: action.payload.nextSongs
      };
    case PLAYLIST_ADD:
      return {
        ...state,
        next: {
          ...state.next,
          ...action.payload
        }
      };
    case UPDATE_PLAYLIST:
      return {
        ...state,
        ...action.payload
      };
    default: {
      return state;
    }
  }
};
