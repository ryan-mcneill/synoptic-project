import { Action, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import FastAverageColor from "fast-average-color";
import shuffle from "lodash.shuffle";
import { updatePlaylist } from "./";
import {
  Background,
  CurrentSongActions,
  SET_BACKGROUND,
  SHUFFLE_SONGS,
  ShuffleSongsAction,
  State,
  TOGGLE_PLAYING
} from "../types";

export const setBackground = (data: Background): CurrentSongActions => ({
  type: SET_BACKGROUND,
  data
});

export const togglePlaying = (isPlaying?: boolean): CurrentSongActions => ({
  type: TOGGLE_PLAYING,
  isPlaying
});

const shuffleSongsAction = (): ShuffleSongsAction => ({
  type: SHUFFLE_SONGS
});

export const nextSong = () => {
  return (
    dispatch: ThunkDispatch<State, void, Action>,
    getState: () => State
  ) => {
    const { playlist } = getState();

    if (playlist && playlist.current && playlist.next.length > 0) {
      const previous = playlist.previous
        ? playlist.previous.concat(playlist.current)
        : [playlist.current];
      const current = playlist.next[0];
      const next =
        playlist.next.length > 1
          ? playlist.next.slice(1, playlist.next.length)
          : [];

      dispatch(updatePlaylist({ previous, current, next }));
    }
  };
};

export const prevSong = () => {
  return (
    dispatch: ThunkDispatch<State, void, Action>,
    getState: () => State
  ) => {
    const { playlist } = getState();

    if (playlist && playlist.current && playlist.previous.length > 0) {
      const previous =
        playlist.previous.length > 1
          ? playlist.previous.slice(0, playlist.previous.length - 1)
          : [];
      const current = playlist.previous[playlist.previous.length - 1];
      const next = [playlist.current, ...playlist.next];

      dispatch(updatePlaylist({ previous, current, next }));
    }
  };
};

export const getBackground = ({ id }: { id: string }) => {
  return (dispatch: Dispatch) => {
    const fac = new FastAverageColor();

    console.log(`${process.env.REACT_APP_SERVER_ADDRESS}/api/album/art/${id}`)

    fac
      .getColorAsync(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/album/art/${id}`
      )
      .then((color: IFastAverageColorResult) => {
        const { isDark, hex: colour } = color;
        dispatch(setBackground({ isDark, colour }));
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  };
};

export const shuffleSongs = () => {
  return (
    dispatch: ThunkDispatch<State, void, Action>,
    getState: () => State
  ) => {
    const { playlist } = getState();
    const previous = playlist.previous;
    const current = playlist.current;
    const next = shuffle(playlist.next);

    dispatch(shuffleSongsAction());
    dispatch(updatePlaylist({ previous, current, next }));
  };
};
