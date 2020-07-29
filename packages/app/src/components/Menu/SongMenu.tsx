import React, { createRef, CSSProperties, ReactElement, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { playlistsToArray } from "../../utils";
import { State } from "../../store/types";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { addToPlaylist } from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const buttonStyles: CSSProperties = {
  margin: "60px 0",
  textAlign: "center"
};

const subtitleStyles: CSSProperties = {
  fontSize: "24px",
  margin: "30px 0",
  textAlign: "center",
  textTransform: "uppercase"
};

interface SongMenuProps {
  songName: string;
  artists: string;
  id: string;
  onClose: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
  addToPlaylist: ({
    playlistId,
    name,
    songId
  }: {
    playlistId?: string;
    name: string;
    songId: string;
  }) => dispatch(addToPlaylist({ playlistId, name, songId }))
});

const mapStateToProps = (state: State) => ({
  playlists: state.playlists.data
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SongMenu: React.FC<PropsFromRedux & SongMenuProps> = ({
  playlists,
  addToPlaylist,
  songName,
  artists,
  id,
  onClose
}): ReactElement => {
  const [playlistView, setPlaylistView] = useState(false);
  const textInput = createRef<HTMLInputElement>();
  const playlistInfo = playlists ? playlistsToArray(playlists) : [];

  const playlistHandler = () => {
    setPlaylistView(true);
  };

  const handleCancel = () => {
    setPlaylistView(false);
  };

  const handleAdd = (name: string, playlistId: string) => {
    addToPlaylist({ name, playlistId, songId: id });
    setPlaylistView(false);
  };

  const handleCreate = () => {
    if (textInput.current && textInput.current.value !== "")
      addToPlaylist({ name: textInput.current.value, songId: id });
    setPlaylistView(false);
    onClose();
  };

  return (
    <div
      style={{
        fontSize: "48px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "24px",
        backgroundColor: "white",
        padding: "10%",
        width: "60%",
        minHeight: "30%",
        maxHeight: "40%",
        overflowY: "scroll"
      }}
    >
      <div
        style={{ position: "absolute", top: "48px", right: "48px" }}
        onClick={onClose}
        title="Close"
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>
      {songName}
      {artists && <div style={{ fontSize: "36px" }}>{artists}</div>}
      <hr />
      {!playlistView ? (
        <>
          <div style={buttonStyles}>Play now</div>
          <div style={buttonStyles}>Play next</div>
          <div style={buttonStyles}>Add to end of queue</div>
          <div style={buttonStyles} onClick={playlistHandler}>
            Add to playlist
          </div>
        </>
      ) : (
        <>
          <div style={subtitleStyles}>Add to existing playlist</div>
          {playlistInfo.map(({ name, id }) => (
            <div
              key={`playlist-add-${id}`}
              style={buttonStyles}
              onClick={() => handleAdd(name, id)}
            >
              {name}
            </div>
          ))}
          <hr />
          <div style={subtitleStyles}>Create new playlist</div>
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
              placeholder="New playlist name..."
              style={{
                width: "calc(100% - 7vh)",
                fontSize: "36px",
                paddingLeft: "2vw"
              }}
            />
            <input
              type="button"
              style={{
                width: "7vh",
                fontSize: "36px"
              }}
              value="Create"
              onClick={handleCreate}
            />
          </div>
          <div
            style={{ ...buttonStyles, marginBottom: "0px" }}
            onClick={handleCancel}
          >
            Cancel
          </div>
        </>
      )}
    </div>
  );
};

export default connector(SongMenu);
