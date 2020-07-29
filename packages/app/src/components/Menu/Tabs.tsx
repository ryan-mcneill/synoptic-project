import React, { FC, ReactElement } from "react";
import { Action } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { faBars, faMusic, faSearch } from "@fortawesome/free-solid-svg-icons";
import { PlaylistTab, TabButton, SearchTab, SongsTab } from "./";
import { setSelectedTab } from "../../store/actions";
import { State, Tabs as TabsType } from "../../store/types";

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
  setSelectedTab: (tab: TabsType) => dispatch(setSelectedTab(tab))
});

const mapStateToProps = (state: State) => ({
  selectedTab: state.menu.selectedTab,
  artists: state.artists.data,
  albums: state.albums.data,
  playlists: state.playlists.data,
  songs: state.songs.data
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Tabs: FC<PropsFromRedux> = ({
  selectedTab,
  setSelectedTab,
  artists,
  albums,
  playlists,
  songs
}): ReactElement => {
  const tabsData = [
    {
      type: "SEARCH" as TabsType,
      icon: faSearch
    },
    {
      type: "PLAYLIST" as TabsType,
      icon: faBars
    },
    {
      type: "SONGS" as TabsType,
      icon: faMusic
    }
  ];

  return (
    <div
      style={{
        height: "90vh",
        width: "100vw",
        backgroundColor: "rgba(255, 255, 255, .5)",
        backdropFilter: "blur(20px)",
        position: "relative",
        bottom: 0
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          fontSize: "72px",
          width: "90vw",
          height: "8vh",
          margin: "0 5vw",
          textAlign: "center"
        }}
      >
        {tabsData.map(({ icon, type }) => (
          <TabButton
            key={`tab-button-${type}`}
            icon={icon}
            isSelected={selectedTab === type}
            onClick={() => setSelectedTab(type)}
            type={type}
          />
        ))}
      </div>
      <div
        style={{
          margin: "0vh 10vw 11vh 10vw",
          height: "71vh"
        }}
      >
        {selectedTab === "PLAYLIST" && <PlaylistTab />}
        {selectedTab === "SONGS" && (
          <SongsTab
            artists={artists}
            albums={albums}
            playlists={playlists}
            songs={songs}
          />
        )}
        {selectedTab === "SEARCH" && <SearchTab />}
      </div>
    </div>
  );
};

export default connector(Tabs);
