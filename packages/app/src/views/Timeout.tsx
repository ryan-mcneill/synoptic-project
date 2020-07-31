import IdleTimer from "react-idle-timer";
import React, { FC, ReactElement } from "react";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../store/types";
import { Action } from "redux";
import { setTimedOut } from "../store/actions";
import { connect, ConnectedProps } from "react-redux";

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => ({
  setTimedOut: (hasTimedOut: boolean) => dispatch(setTimedOut(hasTimedOut))
});

const mapStateToProps = (state: State) => ({
  timedOut: state.timedOut
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Timeout: FC<PropsFromRedux> = ({
  timedOut,
  setTimedOut
}): ReactElement => (
  <>
    <IdleTimer
      timeout={1000 * 30}
      onActive={() => setTimedOut(false)}
      onIdle={() => setTimedOut(true)}
      debounce={250}
    />
    {timedOut && (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          zIndex: 3,
          position: "sticky"
        }}
      />
    )}
  </>
);

export default connector(Timeout);
