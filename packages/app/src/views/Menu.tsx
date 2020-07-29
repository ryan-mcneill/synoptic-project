import React, { FC, ReactElement } from "react";
import { Action } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "../components/Menu";
import { setIsOpen } from "../store/actions";
import { State } from "../store/types";

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
  setIsOpen: (isOpen?: boolean) => dispatch(setIsOpen(isOpen))
});

const mapStateToProps = (state: State) => ({
  albumsLoading: state.albums.loading,
  artistsLoading: state.artists.loading,
  isOpen: state.menu.isOpen
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Menu: FC<PropsFromRedux> = ({
  albumsLoading,
  artistsLoading,
  isOpen,
  setIsOpen
}): ReactElement =>
  !albumsLoading && !artistsLoading ? (
    <div
      style={{
        position: "absolute",
        bottom: isOpen ? 0 : "-90vh",
        transition: "all 0.5s ease"
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "72px",
          position: "relative",
          left: "50%",
          bottom: "-1px",
          transform: "translateX(-50%)",
          height: "72px",
          width: "128px",
          backgroundColor: "rgba(255, 255, 255, .5)",
          borderRadius: "24px 24px 0 0",
          backdropFilter: "blur(20px)"
        }}
        onClick={() => setIsOpen()}
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
      <Tabs />
    </div>
  ) : (
    <></>
  );

export default connector(Menu);
