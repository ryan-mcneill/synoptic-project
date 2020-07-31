import { TIMED_OUT, TimedOutAction } from "../types";

export const timedOut = (state: boolean = false, action: TimedOutAction) => {
  switch (action.type) {
    case TIMED_OUT:
      return action.hasTimedOut;
    default: {
      return state;
    }
  }
};
