import get, { AxiosResponse } from "axios";
import { ActionCreator, Dispatch } from "redux";
import {
  BasicDetails,
  FETCH_ALBUMS,
  FETCH_ALBUMS_FAILURE,
  FETCH_ALBUMS_SUCCESS,
  FetchAlbumsAction,
  FetchAlbumsFailureAction,
  FetchAlbumsSuccessAction,
  Song
} from "../types";

const fetchAlbumsAction: ActionCreator<FetchAlbumsAction> = () => ({
  type: FETCH_ALBUMS
});

const fetchAlbumsFailure: ActionCreator<FetchAlbumsFailureAction> = (
  error
) => ({
  type: FETCH_ALBUMS_FAILURE,
  payload: { error }
});

const fetchAlbumsSuccess: ActionCreator<FetchAlbumsSuccessAction> = (
  albums
) => ({
  type: FETCH_ALBUMS_SUCCESS,
  payload: albums
});

export const fetchAlbums = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchAlbumsAction());

    get(`/api/albums`)
      .then((albumResponse: AxiosResponse<Song[]>) => {
        Promise.all(
          albumResponse.data.map((album: BasicDetails) =>
            get(`/api/songs/album/${album._id}`).then((songResponse) => ({
              [album._id]: songResponse.data
            }))
          )
        )
          .then((songs) => {
            const flatSongs = songs.reduce((acc, curr) => {
              acc = { ...acc, ...curr };
              return acc;
            }, {});

            const albumsData = albumResponse.data.reduce(
              (acc: {}, { _id, name }: Song) => {
                acc = {
                  ...acc,
                  [_id]: { name, songs: flatSongs[_id] }
                };
                return acc;
              },
              {}
            );
            dispatch(fetchAlbumsSuccess(albumsData));
          })
          .catch((err: Error) => {
            dispatch(fetchAlbumsFailure(err.message));
          });
      })
      .catch((err: Error) => {
        dispatch(fetchAlbumsFailure(err.message));
      });
  };
};
