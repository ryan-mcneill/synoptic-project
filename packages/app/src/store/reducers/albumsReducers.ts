import {
  FETCH_ALBUMS,
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUMS_SUCCESS,
  AlbumsActions,
  ArtistsAndAlbumsState
} from "../types";

const initialState: ArtistsAndAlbumsState = {
  loading: false,
  data: {},
  error: null
};

export const albums = (
  state: ArtistsAndAlbumsState = initialState,
  action: AlbumsActions
) => {
  switch (action.type) {
    case FETCH_ALBUMS:
      return {
        ...state,
        loading: true
      };
    case FETCH_ALBUMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_ALBUMS_SUCCESS:
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
