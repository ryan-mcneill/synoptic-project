import React, { createRef, FC, ReactElement, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import isequal from "lodash.isequal";
import { SongsTab } from "./";
import { filterData, filterSongs } from "../../utils";
import { State } from "../../store/types";

const mapStateToProps = (state: State) => ({
  artists: state.artists.data,
  albums: state.albums.data,
  playlists: state.playlists.data,
  songs: state.songs.data
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SearchTab: FC<PropsFromRedux> = ({
  artists,
  albums,
  playlists,
  songs
}): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredArtists, setFilteredArtists] = useState();
  const [filteredAlbums, setFilteredAlbums] = useState();
  const [filteredPlaylists, setFilteredPlaylists] = useState();
  const [filteredSongs, setFilteredSongs] = useState();

  const textInput = createRef<HTMLInputElement>();

  useEffect(() => {
    if (searchTerm !== "") {
      let artistsFiltered = filterData(artists, searchTerm);
      if (!isequal(artistsFiltered, filteredArtists))
        setFilteredArtists(artistsFiltered);

      let albumsFiltered = filterData(albums, searchTerm);
      if (!isequal(albumsFiltered, filteredAlbums))
        setFilteredAlbums(albumsFiltered);

      let playlistsFiltered = filterData(playlists, searchTerm);
      if (!isequal(playlistsFiltered, filteredPlaylists))
        setFilteredPlaylists(playlistsFiltered);

      let songsFiltered = filterSongs(songs, searchTerm);
      if (!isequal(songsFiltered, filteredSongs))
        setFilteredSongs(songsFiltered);
    }
  }, [
    searchTerm,
    albums,
    artists,
    filteredAlbums,
    filteredArtists,
    filteredPlaylists,
    filteredSongs,
    playlists,
    songs
  ]);

  const handleClick = () => {
    if (textInput.current && textInput.current.value !== searchTerm) {
      setSearchTerm(textInput.current.value);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "4vh",
          fontSize: "36px",
          marginBottom: "20px"
        }}
      >
        <input
          ref={textInput}
          type="text"
          placeholder="Type to search..."
          style={{
            width: "calc(100% - 8vh)",
            fontSize: "36px",
            paddingLeft: "2vw"
          }}
        />
        <input
          type="button"
          style={{
            width: "8vh",
            fontSize: "36px"
          }}
          value="Search"
          onClick={() => handleClick()}
        />
      </div>
      {searchTerm === "" ? (
        <div style={{ fontSize: "48px", textAlign: "center" }}>
          Please type something in the search bar to begin.
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: "48px",
              textAlign: "center",
              marginBottom: "80px"
            }}
          >
            Now showing results for &quot;{searchTerm}&quot;
          </div>
          <SongsTab
            artists={filteredArtists}
            albums={filteredAlbums}
            playlists={filteredPlaylists}
            songs={filteredSongs}
          />
        </>
      )}
    </div>
  );
};

export default connector(SearchTab);
