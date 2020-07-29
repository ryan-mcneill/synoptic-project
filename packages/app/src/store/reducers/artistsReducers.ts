import {
  FETCH_ARTISTS,
  FETCH_ARTISTS_FAILURE,
  FETCH_ARTISTS_SUCCESS,
  ArtistsActions,
  ArtistsAndAlbumsState
} from "../types";

const initialState: ArtistsAndAlbumsState = {
  loading: false,
  data: {},
  error: null
};

export const artists = (
  state: ArtistsAndAlbumsState = initialState,
  action: ArtistsActions
) => {
  switch (action.type) {
    case FETCH_ARTISTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_ARTISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_ARTISTS_SUCCESS:
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
