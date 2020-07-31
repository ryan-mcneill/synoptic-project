import get, { AxiosResponse } from "axios";
import { ActionCreator, Dispatch } from "redux";
import {
  FETCH_SONGS,
  FETCH_SONGS_FAILURE,
  FETCH_SONGS_SUCCESS,
  FetchSongsAction,
  FetchSongsFailureAction,
  FetchSongsSuccessAction,
  Song
} from "../types";

const fetchSongsAction: ActionCreator<FetchSongsAction> = () => ({
  type: FETCH_SONGS
});

const fetchSongsFailure: ActionCreator<FetchSongsFailureAction> = (error) => ({
  type: FETCH_SONGS_FAILURE,
  payload: { error }
});

const fetchSongsSuccess: ActionCreator<FetchSongsSuccessAction> = (songs) => ({
  type: FETCH_SONGS_SUCCESS,
  payload: songs
});

export const fetchSongs = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchSongsAction());

    get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/songs/all/all`)
      .then((songsData: AxiosResponse<Song[]>) => {
        dispatch(fetchSongsSuccess(songsData.data));
      })
      .catch((err: Error) => {
        dispatch(fetchSongsFailure(err.message));
      });
  };
};
