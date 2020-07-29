import React, { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AlbumArt, Controls, NowPlaying } from "../components/MusicPlayer";
import { State } from "../store/types";

const mapStateToProps = (state: State) => ({
  albumsLoading: state.albums.loading,
  artistsLoading: state.artists.loading,
  isDark: state.currentSong.background?.isDark,
  backgroundColor: state.currentSong.background?.colour
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const MusicPlayer: React.FC<PropsFromRedux> = ({
  albumsLoading,
  artistsLoading,
  isDark,
  backgroundColor
}): ReactElement =>
  !albumsLoading && !artistsLoading ? (
    <div
      style={{
        display: "block",
        margin: 0,
        position: "absolute",
        height: "100%",
        width: "100%",
        color: isDark ? "white" : "black",
        fontSize: "18px",
        backgroundColor
      }}
    >
      <NowPlaying />
      <AlbumArt />
      <Controls />
    </div>
  ) : (
    <></>
  );

export default connector(MusicPlayer);
