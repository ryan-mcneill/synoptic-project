import React, { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { State } from "../../store/types";

const mapStateToProps = (state: State) => ({
  albumId: state.playlist.current?.albums[0]._id
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const AlbumArt: React.FC<PropsFromRedux> = ({ albumId }): ReactElement => {
  return (
    <div
      className="album-art"
      style={{
        width: "80vw",
        height: "80vw",
        position: "absolute",
        top: "42vh",
        left: "50vw",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#c0c0c0",
        boxShadow: "0px 0px 64px 4px rgba(0,0,0,0.2)"
      }}
    >
      {albumId ? (
        <img
          alt="Album art"
          src={`/api/album/art/${albumId}`}
          width="100%"
          height="100%"
        />
      ) : (
        <div
          style={{
            fontSize: "400px",
            position: "absolute",
            top: "50%",
            left: "48%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <FontAwesomeIcon icon={faMusic} />
        </div>
      )}
    </div>
  );
};

export default connector(AlbumArt);
