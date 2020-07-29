import React, { FC, ReactElement, useState } from "react";
import isempty from "lodash.isempty";
import { ArtistsAndAlbumsData, Song } from "../../store/types";
import { Accordion, SongList, TabButton } from "./";

interface SongsTabProps {
  artists: ArtistsAndAlbumsData | undefined;
  albums: ArtistsAndAlbumsData | undefined;
  playlists: ArtistsAndAlbumsData | undefined;
  songs: Song[] | undefined;
}

const SongsTab: FC<SongsTabProps> = ({
  artists,
  albums,
  playlists,
  songs
}): ReactElement => {
  const [selectedSongTab, setSelectedSongTab] = useState("SONGS");

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          fontSize: "36px",
          width: "100%",
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        <TabButton
          title="SONGS"
          onClick={() => setSelectedSongTab("SONGS")}
          isSelected={selectedSongTab === "SONGS"}
        />
        <TabButton
          title="ARTISTS"
          onClick={() => setSelectedSongTab("ARTISTS")}
          isSelected={selectedSongTab === "ARTISTS"}
        />
        <TabButton
          title="ALBUMS"
          onClick={() => setSelectedSongTab("ALBUMS")}
          isSelected={selectedSongTab === "ALBUMS"}
        />
        <TabButton
          title="PLAYLISTS"
          onClick={() => setSelectedSongTab("PLAYLISTS")}
          isSelected={selectedSongTab === "PLAYLISTS"}
        />
      </div>
      <div
        style={{
          overflowY: "scroll",
          height: "100%"
        }}
      >
        {selectedSongTab === "ARTISTS" && artists && !isempty(artists)
          ? Object.keys(artists).map((id) => (
              <Accordion
                key={`accordion-${id}`}
                title={artists[id].name}
                data={artists[id].songs}
              />
            ))
          : selectedSongTab === "ARTISTS" && (
              <div style={{ fontSize: "48px", textAlign: "center" }}>
                Sorry no artists have been found for your current search.
              </div>
            )}
        {selectedSongTab === "ALBUMS" && albums && !isempty(albums)
          ? Object.keys(albums).map((id) => (
              <Accordion
                key={`accordion-${id}`}
                title={albums[id].name}
                data={albums[id].songs}
              />
            ))
          : selectedSongTab === "ALBUMS" && (
              <div style={{ fontSize: "48px", textAlign: "center" }}>
                Sorry no albums have been found for your current search.
              </div>
            )}
        {selectedSongTab === "PLAYLISTS" && playlists && !isempty(playlists)
          ? Object.keys(playlists).map((id) => (
              <Accordion
                key={`accordion-${id}`}
                title={playlists[id].name}
                data={playlists[id].songs}
              />
            ))
          : selectedSongTab === "PLAYLISTS" && (
              <div style={{ fontSize: "48px", textAlign: "center" }}>
                Sorry no playlists have been found for your current search.
              </div>
            )}
        {selectedSongTab === "SONGS" && songs && songs.length > 0 ? (
          <div style={{ marginTop: "80px" }}>
            <SongList data={songs} isVisible />
          </div>
        ) : (
          selectedSongTab === "SONGS" && (
            <div style={{ fontSize: "48px", textAlign: "center" }}>
              Sorry no songs have been found for your current search.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SongsTab;
