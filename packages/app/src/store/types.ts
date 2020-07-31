// Constants

export const FETCH_SONGS = "FETCH_SONGS";
export const FETCH_SONGS_FAILURE = "FETCH_SONGS_FAILURE";
export const FETCH_SONGS_SUCCESS = "FETCH_SONGS_SUCCESS";

export const FETCH_ARTISTS = "FETCH_ARTISTS";
export const FETCH_ARTISTS_FAILURE = "FETCH_ARTISTS_FAILURE";
export const FETCH_ARTISTS_SUCCESS = "FETCH_ARTISTS_SUCCESS";

export const FETCH_ALBUMS = "FETCH_ALBUMS";
export const FETCH_ALBUMS_FAILURE = "FETCH_ALBUMS_FAILURE";
export const FETCH_ALBUMS_SUCCESS = "FETCH_ALBUMS_SUCCESS";

export const FETCH_PLAYLISTS = "FETCH_PLAYLISTS";
export const FETCH_PLAYLISTS_FAILURE = "FETCH_PLAYLISTS_FAILURE";
export const FETCH_PLAYLISTS_SUCCESS = "FETCH_PLAYLISTS_SUCCESS";

export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const ADD_TO_PLAYLIST_FAILURE = "ADD_TO_PLAYLIST_FAILURE";
export const ADD_TO_PLAYLIST_SUCCESS = "ADD_TO_PLAYLIST_SUCCESS";

export const SET_PLAYLIST = "SET_PLAYLIST";
export const PLAYLIST_ADD = "PLAYLIST_ADD";
export const PLAYLIST_REMOVE = "PLAYLIST_REMOVE";
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST";

export const SET_SONG = "SET_SONG";
export const SET_BACKGROUND = "SET_BACKGROUND";
export const TOGGLE_PLAYING = "TOGGLE_PLAYING";
export const NEXT_SONG = "NEXT_SONG";
export const PREV_SONG = "PREV_SONG";
export const SHUFFLE_SONGS = "SHUFFLE_SONGS";

export const SET_IS_OPEN = "SET_IS_OPEN";
export const SET_SELECTED_TAB = "SET_SELECTED_TAB";

export const TIMED_OUT = "TIMED_OUT";

// Typescript types

export interface BasicDetails {
  _id: string;
  name: string;
}

export interface Song extends BasicDetails {
  artists: BasicDetails[];
  albums: BasicDetails[];
}

export interface Background {
  colour: string;
  isDark: boolean;
}

export interface CurrentSongState {
  isPlaying: boolean;
  data?: Song;
  song?: string;
  albumArt?: string;
  background?: Background;
}

export interface PlaylistState {
  previous: Song[];
  current?: Song;
  next: Song[];
}

export interface ArtistsAndAlbumsData {
  [key: string]: {
    name: string;
    songs: Song[];
  };
}

export interface ArtistsAndAlbumsState {
  error: any;
  loading: boolean;
  data?: ArtistsAndAlbumsData;
}

export type Tabs = "PLAYLIST" | "SONGS" | "SEARCH";

export interface MenuState {
  isOpen: boolean;
  selectedTab: Tabs;
}

export interface State {
  currentSong: CurrentSongState;
  playlist: PlaylistState;
  artists: ArtistsAndAlbumsState;
  albums: ArtistsAndAlbumsState;
  playlists: ArtistsAndAlbumsState;
  menu: MenuState;
  songs: {
    error: any;
    loading: boolean;
    data?: Song[];
  };
  timedOut: boolean;
}

// Action typescript types

export interface SetPlaylistAction {
  type: typeof SET_PLAYLIST;
  payload: {
    firstSong: Song;
    nextSongs?: Song[];
  };
}

export interface PlaylistAddAction {
  type: typeof PLAYLIST_ADD;
  payload: Song;
}

export interface PlaylistRemoveAction {
  type: typeof PLAYLIST_REMOVE;
  payload: Song;
}

export interface UpdatePlaylistAction {
  type: typeof UPDATE_PLAYLIST;
  payload: {
    previous?: Song[];
    current?: Song;
    next?: Song[];
  };
}

export type PlaylistActions =
  | UpdatePlaylistAction
  | SetPlaylistAction
  | PlaylistAddAction
  | PlaylistRemoveAction;

export interface FetchSongsAction {
  type: typeof FETCH_SONGS;
}

export interface FetchSongsFailureAction {
  type: typeof FETCH_SONGS_FAILURE;
  payload: {
    error: Error;
  };
}

export interface FetchSongsSuccessAction {
  type: typeof FETCH_SONGS_SUCCESS;
  payload: Song[];
}

export type SongsActions =
  | FetchSongsAction
  | FetchSongsFailureAction
  | FetchSongsSuccessAction;

export interface FetchArtistsAction {
  type: typeof FETCH_ARTISTS;
}

export interface FetchArtistsFailureAction {
  type: typeof FETCH_ARTISTS_FAILURE;
  payload: {
    error: Error;
  };
}

export interface FetchArtistsSuccessAction {
  type: typeof FETCH_ARTISTS_SUCCESS;
  payload: Song[];
}

export type ArtistsActions =
  | FetchArtistsAction
  | FetchArtistsFailureAction
  | FetchArtistsSuccessAction;

export interface FetchAlbumsAction {
  type: typeof FETCH_ALBUMS;
}

export interface FetchAlbumsFailureAction {
  type: typeof FETCH_ALBUMS_FAILURE;
  payload: {
    error: Error;
  };
}

export interface FetchAlbumsSuccessAction {
  type: typeof FETCH_ALBUMS_SUCCESS;
  payload: Song[];
}

export type AlbumsActions =
  | FetchAlbumsAction
  | FetchAlbumsFailureAction
  | FetchAlbumsSuccessAction;

export interface FetchPlaylistsAction {
  type: typeof FETCH_PLAYLISTS;
}

export interface FetchPlaylistsFailureAction {
  type: typeof FETCH_PLAYLISTS_FAILURE;
  payload: {
    error: Error;
  };
}

export interface FetchPlaylistsSuccessAction {
  type: typeof FETCH_PLAYLISTS_SUCCESS;
  payload: Song[];
}

export interface AddToPlaylistAction {
  type: typeof ADD_TO_PLAYLIST;
}

export interface AddToPlaylistFailureAction {
  type: typeof ADD_TO_PLAYLIST_FAILURE;
  payload: {
    error: Error;
  };
}

export interface AddToPlaylistSuccessAction {
  type: typeof ADD_TO_PLAYLIST_SUCCESS;
  payload: Song[];
}

export type PlaylistsActions =
  | FetchPlaylistsAction
  | FetchPlaylistsFailureAction
  | FetchPlaylistsSuccessAction
  | AddToPlaylistAction
  | AddToPlaylistFailureAction
  | AddToPlaylistSuccessAction;

export interface SetSongAction {
  type: typeof SET_SONG;
  data: Song;
}

export interface SetBackgroundAction {
  type: typeof SET_BACKGROUND;
  data: Background;
}

export interface TogglePlayingAction {
  type: typeof TOGGLE_PLAYING;
  isPlaying?: boolean;
}

export interface NextSongAction {
  type: typeof NEXT_SONG;
}

export interface PrevSongAction {
  type: typeof PREV_SONG;
}

export interface ShuffleSongsAction {
  type: typeof SHUFFLE_SONGS;
}

export type CurrentSongActions =
  | SetSongAction
  | SetBackgroundAction
  | TogglePlayingAction
  | NextSongAction
  | PrevSongAction;

export type ChangeSongType = "PREV" | "NEXT";

export interface SetIsOpenAction {
  type: typeof SET_IS_OPEN;
  isOpen?: boolean;
}

export interface SetSelectedTab {
  type: typeof SET_SELECTED_TAB;
  tab: Tabs;
}

export type MenuActions = SetIsOpenAction | SetSelectedTab;

export interface TimedOutAction {
  type: typeof TIMED_OUT;
  hasTimedOut: boolean;
}
