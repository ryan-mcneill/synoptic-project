import React, { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { artistsToString } from "../../utils";
import { State } from "../../store/types";

const mapStateToProps = (state: State) => ({
  artists: state.playlist.current?.artists,
  songName: state.playlist.current?.name,
  data: state.playlist.current
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const NowPlaying: React.FC<PropsFromRedux> = ({
  artists = [{ name: "Unknown Artist" }],
  songName = "Unknown",
  data
}): ReactElement => {
  return (
    <div
      style={{
        height: "5vh",
        width: "90vw",
        textAlign: "center",
        padding: "5vh 5vw 2vh 5vw"
      }}
    >
      <div style={{ fontSize: "24px" }}>
        {data ? "NOW PLAYING" : "NOTHING PLAYING"}
      </div>
      <div
        style={{
          fontSize: "48px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {data
          ? `${songName} - ${artistsToString(artists)}`
          : "Please make a song selection"}
      </div>
    </div>
  );
};

export default connector(NowPlaying);
