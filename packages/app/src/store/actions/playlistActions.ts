import { Action, ActionCreator } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { getBackground } from "./";
import {
  PLAYLIST_ADD,
  PLAYLIST_REMOVE,
  PlaylistAddAction,
  PlaylistRemoveAction,
  PlaylistState,
  State,
  UPDATE_PLAYLIST,
  UpdatePlaylistAction
} from "../types";

// @ts-ignore
export const setPlaylist: any = (songs) => {
  const firstSong = songs[0];
  const nextSongs = songs.slice(1, songs.length);

  return {
    type: UPDATE_PLAYLIST,
    payload: { firstSong, nextSongs }
  };
};

export const playlistAdd: ActionCreator<PlaylistAddAction> = (song) => ({
  type: PLAYLIST_ADD,
  payload: song
});

export const playlistRemove: ActionCreator<PlaylistRemoveAction> = (song) => ({
  type: PLAYLIST_REMOVE,
  payload: song
});

const updatePlaylistAction: ActionCreator<UpdatePlaylistAction> = ({
  previous,
  current,
  next
}: PlaylistState) => ({
  type: UPDATE_PLAYLIST,
  payload: {
    previous,
    current,
    next
  }
});

export const updatePlaylist = ({ previous, current, next }: PlaylistState) => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    dispatch(updatePlaylistAction({ previous, current, next }));
    if (current && current.albums[0]._id)
      dispatch(getBackground({ id: current?.albums[0]._id }));
  };
};
