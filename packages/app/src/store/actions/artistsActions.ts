import get, { AxiosResponse } from "axios";
import { ActionCreator, Dispatch } from "redux";
import {
  BasicDetails,
  FETCH_ARTISTS,
  FETCH_ARTISTS_FAILURE,
  FETCH_ARTISTS_SUCCESS,
  FetchArtistsAction,
  FetchArtistsFailureAction,
  FetchArtistsSuccessAction,
  Song
} from "../types";

const fetchArtistsAction: ActionCreator<FetchArtistsAction> = () => ({
  type: FETCH_ARTISTS
});

const fetchArtistsFailure: ActionCreator<FetchArtistsFailureAction> = (
  error
) => ({
  type: FETCH_ARTISTS_FAILURE,
  payload: { error }
});

const fetchArtistsSuccess: ActionCreator<FetchArtistsSuccessAction> = (
  artists
) => ({
  type: FETCH_ARTISTS_SUCCESS,
  payload: artists
});

export const fetchArtists = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchArtistsAction());

    get(`/api/artists`)
      .then((artistsResponse: AxiosResponse<Song[]>) => {
        Promise.all(
          artistsResponse.data.map((artist: BasicDetails) =>
            get(`/api/songs/artist/${artist._id}`).then((songResponse) => ({
              [artist._id]: songResponse.data
            }))
          )
        )
          .then((songs) => {
            const flatSongs = songs.reduce((acc, curr) => {
              acc = { ...acc, ...curr };
              return acc;
            }, {});

            const artistsData = artistsResponse.data.reduce(
              (acc: {}, { _id, name }: BasicDetails) => {
                acc = { ...acc, [_id]: { name, songs: flatSongs[_id] } };
                return acc;
              },
              {}
            );
            dispatch(fetchArtistsSuccess(artistsData));
          })
          .catch((err: Error) => {
            dispatch(fetchArtistsFailure(err.message));
          });
      })
      .catch((err: Error) => {
        dispatch(fetchArtistsFailure(err.message));
      });
  };
};
