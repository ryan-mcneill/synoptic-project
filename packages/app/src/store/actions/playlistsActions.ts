import axios, { AxiosResponse } from "axios";
import { Action, ActionCreator, Dispatch } from "redux";
import {
  ADD_TO_PLAYLIST,
  ADD_TO_PLAYLIST_FAILURE,
  ADD_TO_PLAYLIST_SUCCESS,
  AddToPlaylistAction,
  AddToPlaylistFailureAction,
  AddToPlaylistSuccessAction,
  BasicDetails,
  FETCH_PLAYLISTS,
  FETCH_PLAYLISTS_FAILURE,
  FETCH_PLAYLISTS_SUCCESS,
  FetchPlaylistsAction,
  FetchPlaylistsFailureAction,
  FetchPlaylistsSuccessAction,
  Song,
  State
} from "../types";
import { ThunkDispatch } from "redux-thunk";

const fetchPlaylistsAction: ActionCreator<FetchPlaylistsAction> = () => ({
  type: FETCH_PLAYLISTS
});

const fetchPlaylistsFailure: ActionCreator<FetchPlaylistsFailureAction> = (
  error
) => ({
  type: FETCH_PLAYLISTS_FAILURE,
  payload: { error }
});

const fetchPlaylistsSuccess: ActionCreator<FetchPlaylistsSuccessAction> = (
  playlists
) => ({
  type: FETCH_PLAYLISTS_SUCCESS,
  payload: playlists
});

export const fetchPlaylists = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchPlaylistsAction());

    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/playlists`)
      .then((playlistResponse: AxiosResponse<Song[]>) => {
        Promise.all(
          playlistResponse.data.map((playlist: BasicDetails) =>
            axios
              .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/songs/playlist/${playlist._id}`)
              .then((songResponse) => ({
                [playlist._id]: songResponse.data
              }))
          )
        )
          .then((songs) => {
            const flatSongs = songs.reduce((acc, curr) => {
              acc = { ...acc, ...curr };
              return acc;
            }, {});

            const playlistsData = playlistResponse.data.reduce(
              (acc: {}, { _id, name }: Song) => {
                acc = {
                  ...acc,
                  [_id]: { name, songs: flatSongs[_id] }
                };
                return acc;
              },
              {}
            );
            dispatch(fetchPlaylistsSuccess(playlistsData));
          })
          .catch((err: Error) => {
            dispatch(fetchPlaylistsFailure(err.message));
          });
      })
      .catch((err: Error) => {
        dispatch(fetchPlaylistsFailure(err.message));
      });
  };
};

const addToPlaylistAction: ActionCreator<AddToPlaylistAction> = () => ({
  type: ADD_TO_PLAYLIST
});

const addToPlaylistFailure: ActionCreator<AddToPlaylistFailureAction> = (
  error
) => ({
  type: ADD_TO_PLAYLIST_FAILURE,
  payload: { error }
});

const addToPlaylistSuccess: ActionCreator<AddToPlaylistSuccessAction> = (
  playlists
) => ({
  type: ADD_TO_PLAYLIST_SUCCESS,
  payload: playlists
});

export const addToPlaylist = ({
  playlistId,
  songId,
  name
}: {
  playlistId?: string;
  songId: string;
  name: string;
}) => {
  return (
    dispatch: ThunkDispatch<State, void, Action>,
    getState: () => State
  ) => {
    dispatch(addToPlaylistAction());
    const state = getState();
    const requestUrl = playlistId
      ? `/api/playlist/${playlistId}`
      : `/api/playlist/create`;
    const existingSongs =
      state.playlists.data && playlistId
        ? state.playlists.data[playlistId].songs.map(({ _id }) => _id)
        : [songId];
    const songs = !existingSongs.includes(songId)
      ? existingSongs.concat(songId)
      : existingSongs;

    axios
      .post(requestUrl, { name, songs })
      .then(() => {
        dispatch(addToPlaylistSuccess());
        dispatch(fetchPlaylists());
      })
      .catch((error) => dispatch(addToPlaylistFailure(error)));
  };
};
