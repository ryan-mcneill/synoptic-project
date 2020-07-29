import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_FAILURE,
  FETCH_PLAYLISTS_SUCCESS,
  PlaylistsActions,
  ArtistsAndAlbumsState
} from "../types";

const initialState: ArtistsAndAlbumsState = {
  loading: false,
  data: {},
  error: null
};

export const playlists = (
  state: ArtistsAndAlbumsState = initialState,
  action: PlaylistsActions
) => {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_PLAYLISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_PLAYLISTS_SUCCESS:
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
