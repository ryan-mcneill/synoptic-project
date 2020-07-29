import {
  CurrentSongActions,
  CurrentSongState,
  SET_BACKGROUND,
  TOGGLE_PLAYING
} from "../types";

const initialState = {
  isPlaying: false
};

export const currentSong = (
  state: CurrentSongState = initialState,
  action: CurrentSongActions
) => {
  switch (action.type) {
    case SET_BACKGROUND:
      return {
        ...state,
        background: action.data
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying ? action.isPlaying : !state.isPlaying
      };
    default: {
      return state;
    }
  }
};
