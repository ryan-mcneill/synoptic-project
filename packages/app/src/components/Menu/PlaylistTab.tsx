import React, { FC, ReactElement } from "react";
import { Action } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import isempty from "lodash.isempty";
import { InfoTile } from "./";
import { artistsToString } from "../../utils";
import { PlaylistState, State } from "../../store/types";
import { setIsOpen, shuffleSongs, updatePlaylist } from "../../store/actions";

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
  setIsOpen: (isOpen: boolean) => dispatch(setIsOpen(isOpen)),
  shuffleSongs: () => dispatch(shuffleSongs()),
  updatePlaylist: ({ previous, current, next }: PlaylistState) =>
    dispatch(updatePlaylist({ previous, current, next }))
});

const mapStateToProps = (state: State) => ({
  current: state.playlist.current,
  next: state.playlist.next,
  previous: state.playlist.previous
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PlaylistTab: FC<PropsFromRedux> = ({
  current,
  next,
  previous,
  setIsOpen,
  shuffleSongs,
  updatePlaylist
}): ReactElement => {
  let buttonsDisabled =
    (previous && previous.length < 0 && next && next.length < 0 && !current) ||
    isempty(current);

  const handleTileClick = (id: string) => {
    if (current && current._id !== id) {
      const allSongs = [...previous, current, ...next];
      let songIndex = -1;

      allSongs.forEach(({ _id }, index) => {
        if (_id === id) songIndex = index;
      });

      if (songIndex !== -1) {
        const previous = songIndex !== 0 ? allSongs.slice(0, songIndex) : [];
        const current = allSongs[songIndex];
        const next =
          songIndex !== allSongs.length - 1
            ? allSongs.slice(songIndex + 1, allSongs.length)
            : [];
        updatePlaylist({ previous, current, next });
      }
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    updatePlaylist({ previous: [], next: [] });
  };

  const handleShuffle = () => {
    shuffleSongs();
  };

  return (
    <div>
      {previous &&
        previous.length > 0 &&
        previous.map((playlist) => (
          <InfoTile
            key={`info-tile-${playlist._id}`}
            onClick={() => handleTileClick(playlist._id)}
            hasMenu={false}
            data={playlist}
          />
        ))}
      {current && (
        <InfoTile
          key={`info-tile-${current._id}`}
          onClick={() => handleTileClick(current._id)}
          hasMenu={false}
          data={current}
          selected
        />
      )}
      {next &&
        next.length > 0 &&
        next.map((playlist) => (
          <InfoTile
            key={`info-tile-${playlist._id}`}
            onClick={() => handleTileClick(playlist._id)}
            data={playlist}
            hasMenu={false}
          />
        ))}
      {(!next || next.length === 0) &&
        (!previous || previous.length === 0) &&
        !current && (
          <div style={{ fontSize: "48px", textAlign: "center" }}>
            Use the Songs or Search tab to add songs to the playlist.
          </div>
        )}
      <div
        style={{
          display: "flex",
          height: "4vh",
          width: "80vw",
          fontSize: "36px",
          position: "absolute",
          bottom: "5vh"
        }}
      >
        <input
          type="button"
          value="CLEAR"
          style={{
            width: "50%",
            fontSize: "36px",
            fontWeight: "bolder",
            paddingLeft: "2vw",
            background: "none"
          }}
          onClick={handleClear}
          disabled={buttonsDisabled}
        />
        <input
          type="button"
          value="SHUFFLE"
          style={{
            width: "50%",
            fontSize: "36px",
            fontWeight: "bolder",
            paddingLeft: "2vw",
            background: "none"
          }}
          onClick={handleShuffle}
          disabled={buttonsDisabled}
        />
      </div>
    </div>
  );
};

export default connector(PlaylistTab);
