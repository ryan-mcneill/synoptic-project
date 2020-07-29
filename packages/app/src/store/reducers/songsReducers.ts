import {
  FETCH_SONGS,
  FETCH_SONGS_FAILURE,
  FETCH_SONGS_SUCCESS,
  SongsActions,
  ArtistsAndAlbumsState
} from "../types";

const initialState: ArtistsAndAlbumsState = {
  loading: false,
  data: {},
  error: null
};

export const songs = (
  state: ArtistsAndAlbumsState = initialState,
  action: SongsActions
) => {
  switch (action.type) {
    case FETCH_SONGS:
      return {
        ...state,
        loading: true
      };
    case FETCH_SONGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload
      };
    default: {
      return state;
    }
  }
};
