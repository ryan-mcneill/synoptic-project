import React, { ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
// @ts-ignore TODO: create type file for this library
import Loader from "react-loader-spinner";
import { State } from "../store/types";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const mapStateToProps = (state: State) => ({
  albumsLoading: state.albums.loading,
  artistsLoading: state.artists.loading
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PageLoader: React.FC<PropsFromRedux> = ({
  albumsLoading,
  artistsLoading
}): ReactElement =>
  albumsLoading || artistsLoading ? (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        color: "#421C52",
        textAlign: "center",
        fontSize: "48px",
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: "bolder"
      }}
    >
      <Loader type="Bars" color="#421C52" height={128} width={128} />
      <br />
      <div>Loading...</div>
    </div>
  ) : (
    <></>
  );

export default connector(PageLoader);
