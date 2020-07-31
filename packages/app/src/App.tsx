import React, { ReactElement } from "react";
import { Action } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Menu, MusicPlayer, PageLoader, Timeout } from "./views";
import {
  fetchAlbums,
  fetchArtists,
  fetchPlaylists,
  fetchSongs
} from "./store/actions";
import { State } from "./store/types";

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
  fetchAlbums: () => dispatch(fetchAlbums()),
  fetchArtists: () => dispatch(fetchArtists()),
  fetchPlaylists: () => dispatch(fetchPlaylists()),
  fetchSongs: () => dispatch(fetchSongs())
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const App: React.FC<PropsFromRedux> = ({
  fetchAlbums,
  fetchArtists,
  fetchPlaylists,
  fetchSongs
}): ReactElement => {
  fetchAlbums();
  fetchArtists();
  fetchPlaylists();
  fetchSongs();

  return (
    <>
      <div
        style={{
          backgroundColor: "#cdcdcd",
          width: "100vw",
          height: "100vh",
          fontFamily: "'Work Sans', sans-serif",
          overflow: "hidden"
        }}
      >
        <Timeout />
        <PageLoader />
        <MusicPlayer />
        <Menu />
      </div>
    </>
  );
};

export default connector(App);
