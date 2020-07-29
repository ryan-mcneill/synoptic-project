import React, { ReactElement, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import classnames from "classnames";
import ReactAudioPlayer from "react-audio-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faStepBackward,
  faStepForward
} from "@fortawesome/free-solid-svg-icons";
import { nextSong, prevSong, togglePlaying } from "../../store/actions";
import { State } from "../../store/types";

const mapDispatchToProps = (dispatch: any) => ({
  togglePlaying: (playing?: boolean) => dispatch(togglePlaying(playing)),
  nextSong: () => dispatch(nextSong()),
  prevSong: () => dispatch(prevSong())
});

const mapStateToProps = (state: State) => ({
  isDark: state.currentSong.background?.isDark,
  isPlaying: state.currentSong?.isPlaying,
  songId: state.playlist.current?._id,
  data: state.playlist.current
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Controls: React.FC<PropsFromRedux> = ({
  data,
  isDark,
  isPlaying,
  songId,
  togglePlaying,
  nextSong,
  prevSong
}): ReactElement => {
  const [songLength, setSongLength] = useState(0);
  const [songTime, setSongTime] = useState(0);
  let audioPlayer: ReactAudioPlayer;

  const onSongLoad = () => {
    if (audioPlayer?.audioEl?.current) {
      if (isPlaying) audioPlayer.audioEl.current.play();
      setSongLength(audioPlayer.audioEl.current.duration);
    }
  };

  const formatTime = (time: number): string => {
    const tempDate = new Date(Math.round(time) * 1000);
    const minutes = tempDate.getMinutes();
    const seconds = tempDate.getSeconds();

    return (
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  };

  const playStatusHandler = () => {
    if (data && audioPlayer?.audioEl?.current) {
      togglePlaying();
      audioPlayer.audioEl.current[isPlaying ? "pause" : "play"]();
    }
  };

  const nextHandler = () => {
    if (data) {
      nextSong();
      setSongTime(0);
    }
  };

  const prevHandler = () => {
    if (data) {
      prevSong();
      setSongTime(0);
    }
  };

  return (
    <div
      style={{
        height: "10vh",
        width: "90vw",
        position: "absolute",
        bottom: 0,
        padding: "0 5vw 5vh 5vw"
      }}
    >
      <ReactAudioPlayer
        ref={(element: ReactAudioPlayer) => (audioPlayer = element)}
        src={songId ? `/api/song/${songId}` : ""}
        listenInterval={1000}
        onListen={(e) => setSongTime(e)}
        onLoadedMetadata={() => onSongLoad()}
        onEnded={() => nextHandler()}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ fontSize: "48px" }} onClick={() => prevHandler()}>
          <FontAwesomeIcon icon={faStepBackward} />
        </div>
        <div
          style={{ fontSize: "96px", margin: "0 96px" }}
          onClick={playStatusHandler}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </div>
        <div style={{ fontSize: "48px" }} onClick={() => nextHandler()}>
          <FontAwesomeIcon icon={faStepForward} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "48px",
          fontSize: "32px"
        }}
      >
        <div>{formatTime(songTime)}</div>
        <input
          className={classnames({ dark: !isDark, light: isDark })}
          type="range"
          style={{ width: "100%", margin: "0 24px" }}
          min="0"
          max={songLength}
          defaultValue={songTime}
        />
        <div>{formatTime(songLength)}</div>
      </div>
    </div>
  );
};

export default connector(Controls);
