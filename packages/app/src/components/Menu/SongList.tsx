import React, { FC, ReactElement } from "react";
import { Action } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { InfoTile } from "./";
import { artistsToString } from "../../utils";
import { PlaylistState, Song, State, Tabs } from "../../store/types";
import { setSelectedTab, updatePlaylist } from "../../store/actions";

interface AccordionProps {
  isVisible: boolean;
  data: Song[];
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
  updatePlaylist: ({ previous, current, next }: PlaylistState) =>
    dispatch(updatePlaylist({ previous, current, next })),
  setSelectedTab: (tab: Tabs) => dispatch(setSelectedTab(tab))
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SongList: FC<PropsFromRedux & AccordionProps> = ({
  updatePlaylist,
  setSelectedTab,
  data,
  isVisible
}): ReactElement => {
  const handleClick = () => {
    if (data) {
      const current = data[0];
      const next = data.slice(1, data.length);

      updatePlaylist({ previous: [], current, next });
      setSelectedTab("PLAYLIST");
    }
  };

  return (
    <>
      {isVisible && (
        <div style={{ display: "block" }}>
          <div
            style={{ fontSize: "48px", margin: "40px 0" }}
            onClick={handleClick}
          >
            <FontAwesomeIcon
              icon={faPlay}
              style={{ marginLeft: "8px", marginRight: "40px" }}
            />
            Play all
          </div>
          {data.map((song) => (
            <InfoTile
              key={`info-tile-${song._id}`}
              data={song}
              // title={song.name}
              // subtitle={artistsToString(song.artists)}
              // id={song._id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default connector(SongList);
